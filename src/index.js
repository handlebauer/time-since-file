import { stat } from 'fs/promises'
import { mapValues, pipe } from 'remeda'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'

/** @typedef {keyof asDurationMap} DurationUnit */

dayjs.extend(duration)
dayjs.duration({ months: 12 })

const asDurationMap = /** @type {const} */ ({
  milliseconds: 'asMilliseconds',
  seconds: 'asSeconds',
  minutes: 'asMinutes',
  hours: 'asHours',
  days: 'asDays',
  weeks: 'asWeeks',
  months: 'asMonths',
  years: 'asYears',
})

/**
 * @param {any} error
 * @returns {null}
 */
const throwIfNotExists = error => {
  /**
   * 'ENOENT', the resource does not yet exist
   */
  if (error.code === 'ENOENT') {
    return null
  }

  throw new Error(error)
}

/**
 * @param {string} path path to file
 * @returns Times since creation and last modified (null if file doesn't exist)
 */
export const timeSinceFile = async path => {
  const stats = await stat(path).catch(throwIfNotExists)

  if (stats === null) {
    return null
  }

  const createdAt = stats.ctimeMs
  const updatedAt = stats.mtimeMs

  let diff = undefined
  let now = Date.now()

  diff = now - createdAt
  const sinceCreated = dayjs.duration(diff, 'ms')

  diff = now - updatedAt
  const sinceUpdated = dayjs.duration(diff, 'ms')

  const created = pipe(
    asDurationMap,
    mapValues(fnKey => sinceCreated[fnKey]())
  )

  const updated = pipe(
    asDurationMap,
    mapValues(fnKey => sinceUpdated[fnKey]())
  )

  return { created, updated }
}
