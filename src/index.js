
const map = require('pull-stream/throughs/async-map')

const promiseToSink = (promise) => {
  let read = false

  return (abort, cb) => {
    if (abort) return
    promise.then((v) => {
      if (read === false) {
        cb(null, v)
        read = true
      } else {
        cb(true)
      }
    }).catch((err) => cb(err))
  }
}

const promiseToThrough = (promise) =>
  map((v, cb) => promise.then(cb.bind(null, null, v)))

module.exports = {
  promiseToThrough,
  promiseToSink
}
