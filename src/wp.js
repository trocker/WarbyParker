import split from 'split'
import Parser from './Parser'
import Matcher from './Matcher'
import Patterns from './Patterns'

function WP (input, output) {

  const patterns = new Patterns()
  const parser = new Parser(patterns)
  const matcher = new Matcher(patterns)

  input
  .setEncoding('ascii')
  .pipe(split())
  .pipe(parser)
  .pipe(matcher)
  .pipe(output)
}

export default WP

