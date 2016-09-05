# pull-promise

> Pull the value from a promise using [pull-streams](https://pull-stream.github.io/)

[![build status](https://img.shields.io/travis/queckezz/pull-promise.svg?style=flat-square)](https://travis-ci.org/queckezz/pull-promise)
[![npm version](https://img.shields.io/npm/v/pull-promise.svg?style=flat-square)](https://npmjs.org/package/pull-promise)
[![dependency status](https://img.shields.io/david/queckezz/pull-promise.svg?style=flat-square)](https://david-dm.org/queckezz/pull-promise)
[![license](https://img.shields.io/npm/l/pull-promise.svg?style=flat-square)](./license)
[![code style: standard](https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

## Installation

```bash
$ npm install pull-promise
```

## Example

```js
const toPull = require('pull-promise')
const pull = require('pull-stream')
const axios = require('axios')

pull(
  toPull.source(axios.get('http://example.org/posts/1')),
  pull.map((response) => response.body),
  pull.log()
)
// -> "quia et suscipit\nsuscipit recusandae..."
```

## API

### `.source(Promise)`

> Also available as `require('pull-promise/source')`

Creates a [source stream](https://github.com/pull-stream/pull-stream/blob/master/docs/sources/index.md) with the resolved promise value.

```js
const toPull = require('pull-promise')

pull(
  toPull.source(Promise.resolve(5)),
  pull.log()
)
// -> 5
```

### `.through((v) => Promise)`

> Also available as `require('pull-promise/through')`

Creates a [through stream](https://github.com/pull-stream/pull-stream/blob/master/docs/throughs/index.md) with the resolved promise value as output. `fn` is a function accepting the incoming value and returning a `Promise`.

```js
const toPull = require('pull-promise')

pull(
  pull.values([2, 4, 8]),
  toPull.through((v) => Promise.resolve(v * v)),
  pull.log()
)
// -> 4, 16, 64
```

## Run tests

```bash
$ npm test 
```

## License

[MIT](./license)

