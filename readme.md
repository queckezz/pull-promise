# pull-promise

> Pull the value from a promise using pull-streams

[![build status](https://img.shields.io/travis/queckezz/pull-promise.svg?style=flat-square)](https://travis-ci.org/queckezz/pull-promise)
[![npm version](https://img.shields.io/npm/v/pull-promise.svg?style=flat-square)](https://npmjs.org/package/pull-promise)
[![dependency status](https://img.shields.io/david/pull-promise.svg?style=flat-square)](https://david-dm.org/queckezz/pull-promise)
[![license](https://img.shields.io/npm/l/pull-promise.svg?style=flat-square)](./license)
[![code style: standard](https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)## Installation

```bash
$ npm install pull-promise
```

## API

### `.promiseToSink(Promise)`

Creates a [sink stream](https://github.com/pull-stream/pull-stream/blob/master/docs/sinks/index.md) with the resolved promise value.

```js
const { promiseToSink } = require('./')

pull(
  promiseToSink(Promise.resolve(5)),
  pull.log()
)
// -> 5
```

### `.promiseToThrough(Promise)`

Creates a [through stream](https://github.com/pull-stream/pull-stream/blob/master/docs/throughs/index.md) with the resolved promise value as output.

```js
const { promiseToThrough } = require('./')

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

pull(
  pull.values([Date.now()]),
  promiseToThrough(delay(500)),
  pull.log()
)
// -> date after 500ms
```

## Tests

```bash
$ npm test 
```

## License

[MIT](./license)

