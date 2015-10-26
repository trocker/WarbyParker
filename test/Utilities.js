import expect from 'unexpected'
import Utilities from '../src/Utilities'

describe('Utilities', () => {

  describe('parseNumber', () => {

    it('should return a number for a string', () => {

      expect(Utilities.parseNumber('1'), 'to be a number')
      expect(Utilities.parseNumber('2'), 'to be a number')
    })

    it('should throw error for things that cant be cast to numbers', () => {

      expect(() => { Utilities.parseNumber('a') }, 'to throw', 'Not a number')
      expect(() => { Utilities.parseNumber('b') }, 'to throw', 'Not a number')
    })

    it('should throw error for things that cant be cast to integers', () => {

      expect(() => { Utilities.parseNumber('0.2') }, 'to throw', 'Not an integer')
      expect(() => { Utilities.parseNumber('1.2') }, 'to throw', 'Not an integer')
    })
  })
})
