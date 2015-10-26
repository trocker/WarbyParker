import unexpected from 'unexpected'
import unexpectedsinon from 'unexpected-sinon'
import sinon from 'sinon'
import stream from 'stream'
import Parser from '../src/Parser'
import Format from '../src/Format'
import Patterns from '../src/Patterns'

const expect = unexpected.clone()
.use(unexpectedsinon)

describe('Parser', () => {

  let parser

  beforeEach(() => {
    const patterns = new Patterns()
    parser = new Parser(patterns, Format)
  })

  it('should instatiate as intended', () => {

    const Transform = stream.Transform
    expect(parser, 'to be a', Parser)
    expect(parser, 'to be a', Transform)
  })

  it('should construct as intended', () => {

    expect(parser, 'to have own properties', {
      format: Format,
      lineNumber: 1,
      numberOfPaths: 0,
      numberOfPatterns: 0
    })
  })

  describe('nextLine', () => {

    it('should take no arguments', () => {
      expect(parser.nextLine, 'to have arity', 0)
    })

    it('should increment the line number', () => {
      let lineNumber = 1
      do {
        expect(parser.lineNumber, 'to be', lineNumber)
        parser.nextLine()
      }
      while (lineNumber++ < 10)
    })
  })

  describe('_transform', () => {

    const ENCODING = 'utf8'

    it('should call the callback', () => {
      const callback = sinon.spy()
      parser._transform('1', ENCODING, callback)
      expect(callback, 'was called')
    })

    it('should increment the line number on every call', () => {
      let lineNumber = 1
      do {
        expect(parser.lineNumber, 'to be', lineNumber)
        parser._transform('6', ENCODING, () => {})
      }
      while (lineNumber++ < 3)
    })
  })
})
