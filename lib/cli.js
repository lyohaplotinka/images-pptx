#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var argv_1 = require("./argv");
var PptxGenerationService_1 = require("./services/PptxGenerationService");
var fs_1 = require("fs");
var lstat = fs_1.promises.lstat;
function cliWork() {
    return __awaiter(this, void 0, void 0, function () {
        var args, saveTo, pictures, _i, pictures_1, picture, stats, pptxFileName, extension, native, settings, service, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    args = argv_1.default;
                    saveTo = args['save-to'];
                    pictures = args.pictures.length > 1 ? args.pictures : args.pictures[0];
                    if (!Array.isArray(pictures)) return [3 /*break*/, 4];
                    _i = 0, pictures_1 = pictures;
                    _a.label = 1;
                case 1:
                    if (!(_i < pictures_1.length)) return [3 /*break*/, 4];
                    picture = pictures_1[_i];
                    return [4 /*yield*/, lstat(picture).catch(function (err) {
                            throw new Error("CLI error while getting stats of picture: \"" + err.message + "\"");
                        })];
                case 2:
                    stats = _a.sent();
                    if (stats.isDirectory()) {
                        pictures = picture;
                        return [3 /*break*/, 4];
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    pptxFileName = args['out-file-name'];
                    extension = args.ext;
                    native = args.native;
                    settings = {
                        saveTo: saveTo,
                        pictures: pictures,
                        pptxFileName: pptxFileName,
                        extension: extension,
                        native: native,
                    };
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    service = new PptxGenerationService_1.default(settings.saveTo, settings.pictures, settings.pptxFileName, settings.extension, settings.native);
                    return [4 /*yield*/, service.generatePptx()];
                case 6: return [2 /*return*/, _a.sent()];
                case 7:
                    e_1 = _a.sent();
                    throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
cliWork()
    .then(function (result) { return console.log(":: Generated PPTX file: " + result); })
    .catch(function (e) {
    console.error(e);
});
//# sourceMappingURL=cli.js.map