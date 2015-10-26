/**
 * A representation of a pattern.
 */
class Pattern {

    /**
     * Construct a {Pattern}
     * Construct a new {Pattern} from a given string
     * @param {String} string - a string to use to construct pattern from.
     */
    constructor (string) {

        string = String(string)

        // Store the original string.
        this.originalPattern = string

        // Split the string into a tokens.
        this.tokens = string.split(',')

        // Covert string into a regular expression.
        this.regularExpression = new RegExp(string.replace(/,/g, '/')
                                                  .replace(/\*/g, '.*'))

        // Count of wildcards in the pattern.
        this.wildcards = 0

        // Location of the left most wildcard.
        this.leftMostWildcardIndex = null

        this.tokens.forEach((token, index) => {

            // If the token is a wildcard.
            if (token === '*') {

                this.wildcards++

                if (this.leftMostWildcardIndex === null) this.leftMostWildcardIndex = index
            }
        })
    }

    /**
     * Match pattern.
     * Matches a string to this pattern.
     * @param {String} string - string to match.
     * @return {Boolean} true if the string matches this pattern; false
     * otherwise.
     */
    match (string) {

        return String(string).match(this.regularExpression)
    }

    /**
     * Compare pattern.
     * Compares a given pattern against this pattern.
     * @param {Pattern} pattern - a pattern to compare against.
     * @return {Pattern} the winning {Pattern}.
     */
    compare (pattern) {

        // Return this pattern if there is nothing to compare
        if (!pattern) return this

        // If the patterns have the same number of wildcards.
        if (pattern.wildcards === this.wildcards) {

            // If the patterns left most wildcard is further to the right then
            // return the pattern; otherwise return this pattern.
            if (pattern.leftMostWildcardIndex > this.leftMostWildcardIndex) return pattern
            else return this
        }

        // If the pattern has less wildcards that this pattern then return the
        // pattern.
        else if (pattern.wildcards < this.wildcards) return pattern

        // Otherwise; return this pattern.
        else return this
    }

    /**
     * Convert to string.
     * Convert {Pattern} to {String}.
     * @return {String} string representation of the pattern.
     */
    toString () {

        return this.originalPattern
    }
}

export default Pattern

