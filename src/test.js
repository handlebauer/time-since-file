import test from 'ava'
import { writeFile, appendFile } from 'fs/promises'
import { timeSinceFile } from './index.js'

/**
 * @param {number} ms
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const path = 'src/test.txt'
const ms = 1000

test.beforeEach('test', async _ => {
  await writeFile(path, 'test')
  await sleep(ms)
})

test('Should return durations since file creation', async t => {
  const since = await timeSinceFile(path)

  t.true(since.created.milliseconds > ms)
  t.true(since.created.seconds > ms / 1000)
  t.true(since.created.minutes > ms / 1000 / 60)
  t.true(since.created.hours > ms / 1000 / 60 / 60)
  t.true(since.created.days > ms / 1000 / 60 / 60 / 24)
  t.true(since.created.weeks > ms / 1000 / 60 / 60 / 24 / 7)
  t.true(since.created.months > ms / 1000 / 60 / 60 / 24 / 7 / 30)
  t.true(since.created.years > ms / 1000 / 60 / 60 / 24 / 7 / 30 / 365)
})

test('Should return durations since file update', async t => {
  await appendFile(path, 'test')

  await sleep(ms)

  const since = await timeSinceFile(path)

  t.true(since.updated.milliseconds > ms)
  t.true(since.updated.seconds > ms / 1000)
  t.true(since.updated.minutes > ms / 1000 / 60)
  t.true(since.updated.hours > ms / 1000 / 60 / 60)
  t.true(since.updated.days > ms / 1000 / 60 / 60 / 24)
  t.true(since.updated.weeks > ms / 1000 / 60 / 60 / 24 / 7)
  t.true(since.updated.months > ms / 1000 / 60 / 60 / 24 / 7 / 30)
  t.true(since.updated.years > ms / 1000 / 60 / 60 / 24 / 7 / 30 / 365)
})
