
const abortCb = require('pull-stream/util/abort-cb')

module.exports = source

function source (promise, onAbort) {
  var read = false

  return function (abort, cb) {
    if (abort) return abortCb(cb, abort, onAbort)

    promise.then(function (v) {
      if (read === false) {
        cb(null, v)
        read = true
      } else {
        cb(true)
      }
    }).catch(cb)
  }
}
