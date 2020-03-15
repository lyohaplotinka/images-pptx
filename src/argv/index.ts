import * as yargs from 'yargs'
import { readFileSync } from 'fs'
import { join as pathJoin } from 'path'
const pkg = JSON.parse(readFileSync(pathJoin(__dirname, '../../package.json'), 'utf8'))

const argv = yargs
  .option('save-to', {
    alias: 's',
    description: 'Path to the directory (string) where .pptx file will be created',
    type: 'string',
  })
  .option('pictures', {
    alias: 'p',
    description: 'One or multiple picture files, or a path to directory with pictures',
  })
  .option('out-file-name', {
    alias: 'n',
    description: 'Name of output pptx file WITH EXTENSION',
    default: 'presentation.pptx',
    type: 'string',
  })
  .option('ext', {
    alias: 'e',
    description: 'Extension of files which will be grabbed from "pictures" directory',
    type: 'string',
    default: 'jpg',
  })
  .option('native', {
    alias: 'nc',
    description: 'use native OS commands, such as "cp" or "rm" on Mac and Linux instead of Node-based solutions',
    type: 'boolean',
    default: false,
  })
  .array('pictures')
  .usage(`images-pptx CLI v${pkg.version}\nUsage: $0 -[options]`)
  .help()
  .demandOption('save-to')
  .alias('help', 'h').argv

export default argv
