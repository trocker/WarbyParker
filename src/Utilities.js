/**
 * A set of helper utilities.
 */
class Utilities {

  /**
   * Parses an input given as a number or string into an integer.
   * @param {Number|String} number - input to parse.
   * @throws {Error} if the input can not be parsed into an integer.
   * @returns {Number} a integer.
   */
  static parseNumber (number) {

    number = Number(number)

    if (Number.isNaN(number)) throw new Error('Not a number')
    if (!Number.isInteger(number)) throw new Error('Not an integer')

    return number
  }
}

export default Utilities
