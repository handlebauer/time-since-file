# @hbauer/time-since-file

## Install

```bash
$ yarn add @hbauer/time-since-file
$ npm install @hbauer/time-since-file
```

## Usage

```js
import { timeSinceFile } from '@hbauer/time-since-file'

const path = 'path/to/file.ext' // e.g. file created 36 hours ago
const since = await timeSinceFile(path)

assert(since.created.milliseconds === 36 * 60 * 60 * 1000)
assert(since.created.seconds === 36 * 60 * 60)
assert(since.created.minutes === 36 * 60)
assert(since.created.hours === 36)
// etc.
```
