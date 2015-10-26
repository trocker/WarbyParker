import expect from 'unexpected'
import Format from '../src/Format'

describe('Format', () => {

  describe('numberOfPatternsLineNumber', () => {

    it('should always return the starting line number', () => {
      expect(Format.numberOfPatternsLineNumber(), 'to be', Format.STARTING_LINE_NUMBER)
    })
  })

  describe('numberOfPathsLineNumber', () => {

    it('should throw when number or patterns is less than one', () => {
      expect(() => Format.numberOfPathsLineNumber(0), 'to throw error')
    })

    it('should return the starting line plus the number of patterns plus one', () => {
      [1,2,3].forEach(numberOfPatterns => {
        expect(Format.numberOfPathsLineNumber(numberOfPatterns), 'to be', Format.STARTING_LINE_NUMBER + numberOfPatterns + 1)
      })
    })
  })

  describe('lastPatternLineNumber', () => {

    it('should throw when number or patterns is less than one', () => {
      expect(() => Format.lastPatternLineNumber(0), 'to throw error')
    })

    it('should return 2 when the number of patterns is one', () => {
        expect(Format.lastPatternLineNumber(1), 'to be', 2)
    })

    it('should return the number of patterns plus one', () => {
      [2,3].forEach(numberOfPatterns => {
        expect(Format.lastPatternLineNumber(numberOfPatterns), 'to be', numberOfPatterns + 1)
      })
    })
  })

  describe('lastPathLineNumber', () => {

    it('should throw when number or patterns is less than one', () => {
      expect(() => Format.lastPathLineNumber(0, 1), 'to throw error') - 1
    })

    it('should throw when number or paths is less than one', () => {
      expect(() => Format.lastPathLineNumber(1, 0), 'to throw error')
    })

    it('should return the starting line plus the number of patterns plus the number of path plus one', () => {
      [1].forEach(numberOfPatterns => {
        [1,2,3].forEach(numberOfPaths => {
          expect(Format.lastPathLineNumber(numberOfPatterns, numberOfPaths), 'to be', Format.STARTING_LINE_NUMBER + numberOfPatterns + numberOfPaths + 1)
        })
      })
    })
  })

  describe('isNumberOfPatternsLine', () => {

    describe('to be true', () => {

      it('for line number one', () => {
        expect(Format.isNumberOfPatternsLine(1), 'to be true')
      })
    })

    describe('to be false', () => {

      it('line number zero', () => {
        expect(Format.isNumberOfPatternsLine(0), 'to be false')
      })

      it('line numbers above one', () => {
        expect(Format.isNumberOfPatternsLine(2), 'to be false')
      })
    })
  })

  describe('isNumberOfPathsLine', () => {

    describe('to be true', () => {
      it('for line numbers above two number of patterns', () => {
        [1,2,3].forEach(numberOfPaths => {
          expect(Format.isNumberOfPathsLine(numberOfPaths + 2, numberOfPaths), 'to be true')
        })
      })
    })

    describe('to be false', () => {

      it('for line number one for any number of patterns', () => {
        expect(Format.isNumberOfPathsLine(1, 1), 'to be false')
        expect(Format.isNumberOfPathsLine(1, 2), 'to be false')
      })

      it('for line number two for one or more number of patterns', () => {
        expect(Format.isNumberOfPathsLine(2, 1), 'to be false')
        expect(Format.isNumberOfPathsLine(2, 2), 'to be false')
      })
    })
  })

  describe('isPatternLine', () => {

    describe('to be true', () => {

      it('for line number two and above for one or more number of patterns', () => {
        let numberOfPatterns = 1
        ;[2,3,4].forEach(lineNumber => {
          expect(Format.isPatternLine(lineNumber, numberOfPatterns++), 'to be true')
        })
      })
    })

    describe('to be false', () => {

      it('for line number one for any number of patterns', () => {
        [1,2,3].forEach(numberOfPatterns => {
          expect(Format.isPatternLine(1, numberOfPatterns), 'to be false')
        })
      })
    })
  })

  describe('isPathLine', () => {

    describe('to be true', () => {

      it('for line number 4 and above for one pattern and one or more number of paths', () => {
        let numberOfPaths = 1
        ;[4,5,6].forEach(lineNumber => {
          expect(Format.isPathLine(lineNumber, 1, numberOfPaths++), 'to be true')
        })
      })
    })

    describe('to be false', () => {

      it('for line number 1 for any number of patterns or paths', () => {
        [1,2,3].forEach(numberOfPatterns => {
          [1,2,3].forEach(numberOfPaths => {
            expect(Format.isPathLine(1, numberOfPatterns, numberOfPaths), 'to be false')
          })
        })
      })

      it('for line number 2 for any number of patterns or paths', () => {
        [1,2,3].forEach(numberOfPatterns => {
          [1,2,3].forEach(numberOfPaths => {
            expect(Format.isPathLine(2, numberOfPatterns, numberOfPaths), 'to be false')
          })
        })
      })

      it('for line number 3 for any number of patterns or paths', () => {
        [1,2,3].forEach(numberOfPatterns => {
          [1,2,3].forEach(numberOfPaths => {
            expect(Format.isPathLine(3, numberOfPatterns, numberOfPaths), 'to be false')
          })
        })
      })
    })
  })
})
