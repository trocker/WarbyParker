import unexpected from 'unexpected'
import unexpectedsinon from 'unexpected-sinon'
import sinon from 'sinon'
import stream from 'stream'
import Matcher from '../src/Matcher'
import Patterns from '../src/Patterns'

const expect = unexpected.clone()
.use(unexpectedsinon)

describe('Matcher', () => {

  let matcher

  beforeEach(() => {
    const patterns = new Patterns()
    matcher = new Matcher(patterns)
  })

  it('should instatiate as intended', () => {

    const Transform = stream.Transform
    expect(matcher, 'to be a', Matcher)
    expect(matcher, 'to be a', Transform)
  })

  describe('_transform', () => {

    const ENCODING = 'utf8'

    it('should call the callback', () => {
      const callback = sinon.spy()
      matcher._transform('1', ENCODING, callback)
      expect(callback, 'was called')
    })
  })
})
