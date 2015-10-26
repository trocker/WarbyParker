/**
 * Warbly Parker code test input file format.
 * Describes the format of the input file used in the code test.
 */
class Format {

  /**
   * Specifies the starting line number.
   */
  static STARTING_LINE_NUMBER = 1

  /**
   * Calculates the line number of the line which specifies the number of
   * patterns.
   * @return {Number} the line number of the line which specifies the number of
   * patterns.
   */
  static numberOfPatternsLineNumber () {

    // The line which specifies the number of patterns can not come before the
    // starting line.
    let numberOfPatternsLineNumber = this.STARTING_LINE_NUMBER

    // Its expected that the line specifying the number of patterns is the
    // starting line.
    return numberOfPatternsLineNumber
  }

  /**
   * Calculates the line number of the line which specifies the number of
   * paths.
   * @param {Number} numberOfPatterns - number of pattern lines.
   * @throws Error if numberOfPatterns is less than one.
   * @return {Number} the line number of the line which specifies the number of
   * paths.
   */
  static numberOfPathsLineNumber (numberOfPatterns) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')

    // The line which specifies the number of paths can not come before the last
    // pattern line.
    let numberOfPathsLineNumber = this.lastPatternLineNumber(numberOfPatterns)

    // The line which specifies the number of paths must be one line after the
    // last pattern line.
    numberOfPathsLineNumber += 1

    return numberOfPathsLineNumber
  }

  /**
   * Calculates the line number of the last pattern line.
   * @param {Number} numberOfPatterns - number of pattern lines.
   * @throws Error if numberOfPatterns is less than one.
   * @return {Number} the last pattern line number.
   */
  static lastPatternLineNumber (numberOfPatterns) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')

    // The last pattern line can not come before the line which specifies the
    // number of number of patterns.
    let lastPatternLineNumber = this.numberOfPatternsLineNumber()

    // The last pattern is on the line specified by the number of patterns.
    lastPatternLineNumber += numberOfPatterns

    return lastPatternLineNumber
  }

  /**
   * Calculates the line number of the last path line.
   * @param {Number} numberOfPatterns - number of pattern lines.
   * @param {Number} numberOfPaths - number of path lines.
   * @throws Error if numberOfPatterns is less than one.
   * @throws Error if numberOfPaths is less than one.
   * @return {Number} the lashsh line number.
   */
  static lastPathLineNumber (numberOfPatterns, numberOfPaths) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')
    if (numberOfPaths < 1) throw new Error('Must have at least one path')

    // The last path line can not come before the last pattern line.
    let lastPathLineNumber = this.numberOfPathsLineNumber(numberOfPatterns)

    // The last path is on the line specified by the number of paths.
    lastPathLineNumber += numberOfPaths

    return lastPathLineNumber
  }

  /**
   * Determines if the line represents the number of patterns.
   * @param {Number} lineNumber - line number to check
   * @return {Boolean} true, if the line is the line; false otherwise
   */
  static isNumberOfPatternsLine (lineNumber) {

    // Check that the given line number matches the expected location.
    return lineNumber === this.numberOfPatternsLineNumber()
  }

  /**
   * Determines if the line represents the number of paths.
   * @param {Number} lineNumber - line number to check
   * @param {Number} numberOfPatterns - number of pattern lines
   * @return {Boolean} true, if the line is the line; false otherwise
   */
  static isNumberOfPathsLine (lineNumber, numberOfPatterns) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')

    // Check that the given line number matches the expected location.
    return lineNumber === this.numberOfPathsLineNumber(numberOfPatterns)
  }

  /**
   * Determines if the line is a pattern line.
   * @param {Number} lineNumber - line number to check
   * @param {Number} numberOfPatterns - number of pattern lines
   * @return {Boolean} true, if the line is a pattern line; false otherwise
   */
  static isPatternLine (lineNumber, numberOfPatterns) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')

    // The line is after the number of patterns line.
    let isAfterNumberOfPatternsLine = lineNumber > this.numberOfPatternsLineNumber()

    // The line is before the last pattern line.
    let isBeforeLastPatternLine = lineNumber <= this.lastPatternLineNumber(numberOfPatterns)

    return isAfterNumberOfPatternsLine && isBeforeLastPatternLine
  }

  /**
   * Determines if the line is a path line.
   * @param {Number} lineNumber - line number to check
   * @param {Number} numberOfPatterns - number of pattern lines
   * @param {Number} numberOfPaths- number of path lines
   * @return {Boolean} true, if the line is a path line; false otherwise
   */
  static isPathLine (lineNumber, numberOfPatterns, numberOfPaths) {

    if (numberOfPatterns < 1) throw new Error('Must have at least one pattern')
    if (numberOfPaths < 1) throw new Error('Must have at least one path')

    // The line is after the number of paths line.
    let isAfterNumberOfPathsLine = lineNumber > this.numberOfPathsLineNumber(numberOfPatterns)

    // The line is before the last path line.
    let isBeforeLastPathLine = lineNumber <= this.lastPathLineNumber(numberOfPatterns, numberOfPaths)

    return isAfterNumberOfPathsLine && isBeforeLastPathLine
  }
}

export default Format
