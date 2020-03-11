"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ncp = require("ncp");
/**
 *
 * @param what
 * @param where
 */
exports.ncpCopy = function (what, where) {
    return new Promise(function (resolve, reject) {
        ncp(what, where, { limit: 16 }, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        });
    });
};
//# sourceMappingURL=index.js.map