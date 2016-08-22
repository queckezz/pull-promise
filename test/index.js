
const pull = require('pull-stream')
const toPull = require('../')
const test = require('tape')

test('source(ResolvedPromise)', (t) => {
  const num = 5
  pull(
    toPull.source(Promise.resolve(5)),
    pull.drain((val) => {
      t.equal(val, num)
      t.end()
    })
  )
})

test('source(RejectedPromise)', (t) => {
  pull(
    toPull.source(Promise.reject(new Error('boom'))),
    pull.collect((err, _) => {
      if (err) {
        t.true(err)
        t.equal(err.message, 'boom')
      } else {
        t.fail()
      }
      t.end()
    })
  )
})

test('through(ResolvedPromise)', (t) => {
  pull(
    pull.values([2, 4, 8]),
    toPull.through((v) => Promise.resolve(v * v)),
    pull.collect((err, res) => {
      if (err) {
        t.fail()
      }

      t.deepEqual(res, [4, 16, 64])
      t.end()
    })
  )
})

test('through(RejectedPromise)', (t) => {
  pull(
    pull.values([2, 4, 8]),
    toPull.through((v) => {
      if (v === 4) return Promise.reject(new Error())
      return Promise.resolve(v)
    }),
    pull.collect((err, res) => {
      if (err) {
        t.equal(res.length, 1)
        t.pass()
        t.end()
      }
    })
  )
})
