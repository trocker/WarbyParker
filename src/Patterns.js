/**
 * A collection of patterns.
 * Collects and stores {Pattern}s to be matched.
 */
class Patterns {

    /**
     * Construct Patterns.
     */
    constructor () {

        this.patterns = []
    }

    /**
     * Add a pattern.
     * @param {Pattern} pattern - the pattern to add.
     */
    add (pattern) {

        this.patterns.push(pattern)
    }

    /**
     * Match a string to a known pattern.
     * NOTE: The matching algorithm used has not been optimized. It is currently
     * O(n) where n is the number of patterns.
     * TODO: Improve efficiency.
     * @param {String} string - the string to check for a match.
     * @return {Pattern|null} either the matched {Pattern} or null if no match.
     */
    match (string) {

        let match = null

        /**
         * Matches a pattern
         * @param {Pattern} pattern - pattern to match.
         */
        function matchPattern (pattern) {

            // If the string matches the pattern.
            if (pattern.match(string)) {

                // Compare against previous match and update.
                match = pattern.compare(match)
            }
        }

        // Match against each pattern.
        this.patterns.forEach(matchPattern)

        return match
    }
}

export default Patterns

