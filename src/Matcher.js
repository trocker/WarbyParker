import stream from 'stream'

const NEW_LINE = '\n'
const NO_MATCH = 'NO MATCH'

const Transform = stream.Transform

/**
 * A streaming string matcher.
 * Matches strings in a stream to known patterns.
 */
class Matcher extends Transform {

  /**
   * Construct transform.
   * @param {Patterns} patterns - a Patterns instance to match patterns from.
   */
  constructor (patterns) {

    super()

    this.patterns = patterns
  }

  /**
   * transform stream.
   */
  _transform (chunk, encoding, processed) {

    // Convert the chunk to a string.
    const string = chunk.toString()

    // Check string for a pattern match.
    let match = this.patterns.match(string)

    // If no match; default to no match string.
    match = match || NO_MATCH

    // Push match string into stream.
    this.push(match + NEW_LINE)

    processed()
  }
}
export default Matcher
