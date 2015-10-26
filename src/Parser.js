import stream from 'stream'
import Format from './Format'
import Pattern from './Pattern'
import Utilities from './Utilities'

const Transform = stream.Transform

/**
 * Stream parser
 */
class Parser extends Transform {

  /**
   * Construct transform.
   * @param {Patterns} patterns - a Patterns instance to collect patterns found.
   * @param {Format} format - a Format to parse in.
   */
  constructor (patterns, format = Format) {

    super()

    this.format = format
    this.patterns = patterns
    this.lineNumber = 1
    this.numberOfPaths = 0
    this.numberOfPatterns = 0
  }

  /**
   * Advances the parser to the next line.
   */
  nextLine () {

    // Advance line number to the next line.
    this.lineNumber++
  }

  /**
   * transform stream.
   */
  _transform (chunk, encoding, processed) {

    // Convert the chunk to a string.
    const string = chunk.toString()

    // If on the line which specifies the number of patterns.
    if (this.format.isNumberOfPatternsLine(this.lineNumber)) {

      // Parse the string as a number and record the number of patterns.
      this.numberOfPatterns = Utilities.parseNumber(string)
    }

    // If on a pattern line.
    else if (this.format.isPatternLine(this.lineNumber, this.numberOfPatterns)) {

      // Create a new pattern from the string.
      const pattern = new Pattern(string)

      // Add the pattern to the patterns.
      this.patterns.add(pattern)
    }

    // If on the line which specifies the number of paths.
    else if (this.format.isNumberOfPathsLine(this.lineNumber, this.numberOfPatterns)) {

      // Parse the string as a number and record the number of paths.
      this.numberOfPaths = Utilities.parseNumber(string)
    }

    // If on a path line.
    else if (this.format.isPathLine(this.lineNumber, this.numberOfPatterns, this.numberOfPaths)) {

      // Push the string through the stream.
      this.push(`${string}\n`)
    }

    this.nextLine()

    processed()
  }
}

export default Parser
