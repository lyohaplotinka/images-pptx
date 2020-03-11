declare enum OS {
    DARWIN = "darwin",
    WIN = "windows",
    LINUX = "linux"
}
export default class NativeLaunchService {
    readonly osType: OS;
    private macRegexp;
    private windowsRegexp;
    private linuxRegexp;
    private copyFileCommand;
    private copyFolderCommand;
    private rmFileCommand;
    private rmFolderCommand;
    private zipCommand;
    constructor();
    private initCommands;
    private asyncExec;
    copy(from: string, to: string): Promise<string>;
    rm(path: string): Promise<string>;
    zip(what: string, zipFile: string): Promise<string>;
}
export {};
