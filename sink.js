
module.exports = sink

function sink (promise) {
  var read = false

  return function (abort, cb) {
    if (abort) return

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
