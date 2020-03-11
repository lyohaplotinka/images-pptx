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
var os_1 = require("os");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var lstat = fs_1.promises.lstat;
var OS;
(function (OS) {
    OS["DARWIN"] = "darwin";
    OS["WIN"] = "windows";
    OS["LINUX"] = "linux";
})(OS || (OS = {}));
var NativeLaunchService = /** @class */ (function () {
    function NativeLaunchService() {
        this.macRegexp = new RegExp('darwin', 'gi');
        this.windowsRegexp = new RegExp('windows', 'gi');
        this.linuxRegexp = new RegExp('linux', 'gi');
        this.copyFileCommand = '';
        this.copyFolderCommand = '';
        this.rmFileCommand = '';
        this.rmFolderCommand = '';
        this.zipCommand = '';
        var nodeOsType = os_1.type();
        if (this.macRegexp.test(nodeOsType))
            this.osType = OS.DARWIN;
        else if (this.windowsRegexp.test(nodeOsType))
            this.osType = OS.WIN;
        else if (this.linuxRegexp.test(nodeOsType))
            this.osType = OS.LINUX;
        else {
            throw new Error("Could not detect OS type: native mode unavailable for os \"" + nodeOsType + "\"");
        }
        this.initCommands();
    }
    NativeLaunchService.prototype.initCommands = function () {
        switch (this.osType) {
            case OS.DARWIN:
            case OS.LINUX:
                this.copyFileCommand = this.copyFolderCommand = "cp -R";
                this.rmFileCommand = this.rmFolderCommand = "rm -rf";
                this.zipCommand = "zip -q -r";
                break;
            case OS.WIN:
                this.copyFileCommand = "copy";
                this.copyFolderCommand = "Xcopy";
                this.rmFileCommand = "del";
                this.rmFolderCommand = "rmdir";
                // ZIP is not included well in every WINDOWS version :C
                break;
        }
    };
    /**
     * @returns {string} stdout
     * @param command
     */
    NativeLaunchService.prototype.asyncExec = function (command) {
        return new Promise(function (resolve, reject) {
            child_process_1.exec(command, function (error, stdout, stderr) {
                if (stdout)
                    console.log(stdout);
                if (stderr)
                    console.error(stderr);
                if (error)
                    reject(error);
                resolve(stdout);
            });
        });
    };
    /**
     * @returns {string} stdout
     * @param from
     * @param to
     */
    NativeLaunchService.prototype.copy = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lstat(from)];
                    case 1:
                        stats = _a.sent();
                        command = stats.isDirectory()
                            ? this.copyFolderCommand + " \"" + from + "\" \"" + to + "\""
                            : this.copyFileCommand + " \"" + from + "\" \"" + to + "\"";
                        return [4 /*yield*/, this.asyncExec(command)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @returns {string} stdout
     * @param path
     */
    NativeLaunchService.prototype.rm = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, lstat(path)];
                    case 1:
                        stats = _a.sent();
                        command = stats.isDirectory() ? this.rmFolderCommand + " \"" + path + "\"" : this.rmFileCommand + " \"" + path + "\"";
                        return [4 /*yield*/, this.asyncExec(command)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @returns {string} stdout
     * @param what
     * @param zipFile
     */
    NativeLaunchService.prototype.zip = function (what, zipFile) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.osType === OS.WIN)
                            return [2 /*return*/, 'unavailable'];
                        command = "cd \"" + what + "\" && " + this.zipCommand + " \"" + zipFile + "\" .";
                        return [4 /*yield*/, this.asyncExec(command)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NativeLaunchService;
}());
exports.default = NativeLaunchService;
//# sourceMappingURL=NativeLaunchService.js.map