
const toPull = require('../')
const pull = require('pull-stream')
const test = require('tape')

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

test('pulls from a simple value', (t) => {
  const num = 5
  pull(
    toPull.sink(Promise.resolve(5)),
    pull.drain((val) => {
      t.equal(val, num)
      t.end()
    })
  )
})

test('pulls from a delay promise', (t) => {
  const rate = 500

  pull(
    pull.values([Date.now()]),
    toPull.through(delay(rate)),
    pull.drain((val) => {
      const between = Date.now() - val
      t.true(between <= rate + 100)
      t.true(between >= rate - 100)
      t.end()
    })
  )
})
