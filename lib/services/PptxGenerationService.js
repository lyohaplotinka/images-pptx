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
var path_1 = require("path");
var FileStructureService_1 = require("./FileStructureService");
var SwigRenderService_1 = require("./SwigRenderService");
var templates_1 = require("../includes/templates");
var PptxGenerationService = /** @class */ (function () {
    function PptxGenerationService(workingDirectory, filePatterns, outFile, extension, native) {
        if (outFile === void 0) { outFile = 'presentation.pptx'; }
        if (extension === void 0) { extension = 'jpg'; }
        if (native === void 0) { native = false; }
        this.workingDirectory = workingDirectory;
        this.filePatterns = filePatterns;
        this.outFile = outFile;
        this.extension = extension;
        this.native = native;
        this.slides = [];
    }
    PptxGenerationService.prototype.assembleSlidesArray = function () {
        var currentId = 7;
        var counter = -1;
        var specialId = 255;
        this.slides = this.fileStructure.pictures.map(function (picture) {
            currentId++;
            counter++;
            specialId++;
            return {
                id: currentId,
                specialId: specialId,
                rId: "rId" + currentId,
                title: "slide-" + counter,
                picture: path_1.basename(picture),
                renamedPicture: "slide-" + counter + path_1.extname(picture),
            };
        });
    };
    PptxGenerationService.prototype.generateContentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var locals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locals = {
                            slides: this.slides,
                        };
                        return [4 /*yield*/, this.swigRenderer.renderTemplate(templates_1.default.ContentTypes, locals, '[Content_Types].xml')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PptxGenerationService.prototype.generatePresentation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var locals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locals = {
                            slides: this.slides,
                        };
                        return [4 /*yield*/, this.swigRenderer.renderTemplate(templates_1.default.PresentationTemplate, locals, 'presentation.xml')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PptxGenerationService.prototype.generatePptRels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var locals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        locals = {
                            slides: this.slides,
                        };
                        return [4 /*yield*/, this.swigRenderer.renderTemplate(templates_1.default.PptRelsTemplate, locals, 'presentation.xml.rels')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PptxGenerationService.prototype.generateSliderRels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var counter, promisesArray, _i, _a, slide, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        counter = 0;
                        promisesArray = [];
                        for (_i = 0, _a = this.slides; _i < _a.length; _i++) {
                            slide = _a[_i];
                            promisesArray.push(this.swigRenderer.renderTemplate(templates_1.default.SlidesRelsTemplate, { slide: slide }, "slide-" + counter + ".xml.rels"));
                            counter++;
                        }
                        return [4 /*yield*/, Promise.all(promisesArray)];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.find(function (res) { return res === false; }) === undefined];
                }
            });
        });
    };
    PptxGenerationService.prototype.generatePptx = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promisesArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fileStructure = new FileStructureService_1.default(this.workingDirectory, this.native);
                        if (!Array.isArray(this.filePatterns)) return [3 /*break*/, 1];
                        this.fileStructure.pictures = this.filePatterns;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.fileStructure.readFilesFromDirectory(this.filePatterns, this.extension)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.assembleSlidesArray();
                        return [4 /*yield*/, this.fileStructure.makeRequiredStructure()];
                    case 4:
                        _a.sent();
                        this.swigRenderer = new SwigRenderService_1.default(this.fileStructure.tempPath);
                        promisesArray = [
                            this.fileStructure.makeRestStructure(),
                            this.generateContentTypes(),
                            this.generatePptRels(),
                            this.generatePresentation(),
                            this.generateSliderRels(),
                        ];
                        return [2 /*return*/, Promise.all(promisesArray)
                                .then(function () {
                                return _this.fileStructure
                                    .packAndClean(_this.outFile)
                                    .then(function () {
                                    return path_1.join(_this.workingDirectory, _this.outFile);
                                })
                                    .catch(function (err) {
                                    return err.message;
                                });
                            })
                                .catch(function (err) {
                                console.error(err);
                                return err.message;
                            })];
                }
            });
        });
    };
    return PptxGenerationService;
}());
exports.default = PptxGenerationService;
//# sourceMappingURL=PptxGenerationService.js.map