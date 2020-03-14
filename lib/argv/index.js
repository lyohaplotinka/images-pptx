"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
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
    .array('pictures')
    .help()
    .alias('help', 'h').argv;
exports.default = argv;
//# sourceMappingURL=index.js.map