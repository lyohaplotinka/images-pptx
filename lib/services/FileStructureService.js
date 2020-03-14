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
var fs_1 = require("fs");
var path_1 = require("path");
var utils_1 = require("../utils");
var archiver = require("archiver");
var rimraf = require("rimraf");
var NativeLaunchService_1 = require("./NativeLaunchService");
var readdir = fs_1.promises.readdir, mkdtemp = fs_1.promises.mkdtemp, mkdir = fs_1.promises.mkdir;
var FileStructureService = /** @class */ (function () {
    /**
     *
     * @param workingDirectory
     * @param native
     */
    function FileStructureService(workingDirectory, native) {
        if (native === void 0) { native = false; }
        this.workingDirectory = workingDirectory;
        this.native = native;
        this.tempPath = '';
        this.pictures = [];
        if (this.native)
            this.command = new NativeLaunchService_1.default();
    }
    FileStructureService.prototype.copyShared = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var sharedDir, pptMediaDir, pptRelsDir;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        sharedDir = path_1.join(__dirname, '../../shared');
                        pptMediaDir = path_1.join(this.tempPath, 'ppt/media');
                        pptRelsDir = path_1.join(this.tempPath, 'ppt/_rels');
                        if (!this.native) return [3 /*break*/, 4];
                        return [4 /*yield*/, ((_a = this.command) === null || _a === void 0 ? void 0 : _a.copy(sharedDir + '/.', this.tempPath))];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, ((_b = this.command) === null || _b === void 0 ? void 0 : _b.mkdir(pptMediaDir))];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, ((_c = this.command) === null || _c === void 0 ? void 0 : _c.mkdir(pptRelsDir))];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, utils_1.ncpCopy(sharedDir, this.tempPath)];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, mkdir(pptMediaDir)];
                    case 6:
                        _d.sent();
                        return [4 /*yield*/, mkdir(pptRelsDir)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FileStructureService.prototype.copyPictures = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promisesArray, counter, _i, _a, picture, from, to;
            return __generator(this, function (_b) {
                promisesArray = [];
                counter = 0;
                for (_i = 0, _a = this.pictures; _i < _a.length; _i++) {
                    picture = _a[_i];
                    from = picture;
                    to = path_1.join(this.tempPath, 'ppt/media', "slide-" + counter + path_1.extname(picture));
                    promisesArray.push(this.native ? this.command.copy(from, to) : utils_1.ncpCopy(from, to));
                    counter++;
                }
                return [2 /*return*/, Promise.all(promisesArray)
                        .then(function () { return true; })
                        .catch(function (err) {
                        console.error(err);
                        throw new Error("Error during copying pictures: \"" + err.message + "\"");
                    })];
            });
        });
    };
    /**
     * @returns {boolean}
     * @param slidesCount
     */
    FileStructureService.prototype.copySlides = function (slidesCount) {
        return __awaiter(this, void 0, void 0, function () {
            var promisesArray, i, from, to, promise;
            return __generator(this, function (_a) {
                promisesArray = [];
                for (i = 0; i < slidesCount; i++) {
                    from = path_1.join(this.tempPath, 'ppt/slides/slide1.xml');
                    to = path_1.join(this.tempPath, "ppt/slides/slide-" + i + ".xml");
                    promise = this.native ? this.command.copy(from, to) : utils_1.ncpCopy(from, to);
                    promisesArray.push(promise);
                }
                return [2 /*return*/, Promise.all(promisesArray)
                        .then(function () { return true; })
                        .catch(function (err) {
                        console.log(err);
                        throw new Error("Error during creating slides: \"" + err.message + "\"");
                    })];
            });
        });
    };
    FileStructureService.prototype.makeRequiredStructure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, mkdtemp(path_1.join(this.workingDirectory, 'pres.pptx.')).catch(function (err) {
                                console.error(err);
                                throw new Error("Error during creating temp directory: \"" + err.message + "\"");
                            })];
                    case 1:
                        _a.tempPath = _b.sent();
                        return [4 /*yield*/, this.copyShared().catch(function (err) {
                                console.error(err);
                                throw new Error("Error during creating base file structure: \"" + err.message + "\"");
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FileStructureService.prototype.makeRestStructure = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promisesArray;
            return __generator(this, function (_a) {
                promisesArray = [this.copyPictures(), this.copySlides(this.pictures.length)];
                return [2 /*return*/, Promise.all(promisesArray)
                        .then(function () { return true; })
                        .catch(function (err) {
                        throw new Error("File structure error: \"" + err.message + "\"");
                    })];
            });
        });
    };
    /**
     *
     * @param path
     * @param extension
     */
    FileStructureService.prototype.readFilesFromDirectory = function (path, extension) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            readdir(path)
                .then(function (allFiles) {
                var regExp = new RegExp("." + extension, 'gi');
                _this.pictures = allFiles.reduce(function (total, current) {
                    if (current.match(regExp)) {
                        total.push(path_1.join(path, current));
                    }
                    return total;
                }, []);
                resolve();
            })
                .catch(function (err) {
                console.error(err);
                reject(new Error("Error during reading files from directory: \"" + err.message + "\""));
            });
        });
    };
    /**
     *
     * @param outFile
     */
    FileStructureService.prototype.packAndClean = function (outFile) {
        var _this = this;
        var _a;
        if (this.native && ((_a = this.command) === null || _a === void 0 ? void 0 : _a.osType) !== 'windows') {
            return new Promise(function (resolve, reject) {
                return _this.command.zip(_this.tempPath, path_1.join(_this.workingDirectory, outFile)).then(function () {
                    return _this.command.rm(_this.tempPath)
                        .then(function () { return resolve(); })
                        .catch(function (err) {
                        throw new Error("Error during native PPTX packing: \"" + err.message + "\"");
                    });
                });
            });
        }
        else {
            var out = path_1.join(this.workingDirectory, outFile);
            var archive_1 = archiver('zip', { zlib: { level: 9 } });
            var stream_1 = fs_1.createWriteStream(out);
            return new Promise(function (resolve, reject) {
                archive_1
                    .directory(_this.tempPath, false)
                    .on('error', function (err) { return reject(err); })
                    .pipe(stream_1);
                stream_1.on('close', function () { return resolve(); });
                archive_1.finalize().then(function () {
                    rimraf(_this.tempPath, function (error) {
                        if (error) {
                            console.error(error);
                            throw new Error("Error during non-native PPTX packing: \"" + error.message + "\"");
                        }
                    });
                });
            });
        }
    };
    return FileStructureService;
}());
exports.default = FileStructureService;
//# sourceMappingURL=FileStructureService.js.map