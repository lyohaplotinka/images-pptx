"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var fs_1 = require("fs");
var path_1 = require("path");
var pkg = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, '../../package.json'), 'utf8'));
var argv = yargs
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
    .usage("images-pptx CLI v" + pkg.version + "\nUsage: $0 -[options]")
    .help()
    .demandOption('save-to')
    .alias('help', 'h').argv;
exports.default = argv;
//# sourceMappingURL=index.js.map