
const toPull = require('../')
const pull = require('pull-stream')
const test = require('tape')

const multiply = (v) => Promise.resolve(v * v)

test('promise source', (t) => {
  const num = 5
  pull(
    toPull.source(Promise.resolve(5)),
    pull.drain((val) => {
      t.equal(val, num)
      t.end()
    })
  )
})

test('promise through', (t) => {
  pull(
    pull.values([2, 4, 8]),
    toPull.through(multiply),
    pull.collect((err, arr) => {
      if (err) {
        t.fail()
      }

      t.deepEqual(arr, [4, 16, 64])
      t.end()
    })
  )
})
