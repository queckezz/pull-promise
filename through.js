
const map = require('pull-stream/throughs/async-map')

module.exports = through

function through (createPromise) {
  return map(function (v, cb) {
    return createPromise(v)
      .then(function (res) {
        cb(null, res)
      })
      .catch(function (err) {
        cb(err)
      })
  })
}
