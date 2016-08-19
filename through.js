
const map = require('pull-stream/throughs/async-map')

module.exports = through

function through (promise) {
  return map(function (v, cb) {
    return promise.then(cb.bind(null, null, v))
  })
}
