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
    /**
     * @returns {string} stdout
     * @param command
     */
    private asyncExec;
    /**
     * @returns {string} stdout
     * @param from
     * @param to
     */
    copy(from: string, to: string): Promise<string>;
    /**
     * @returns {string} stdout
     * @param path
     */
    rm(path: string): Promise<string>;
    /**
     * @returns {string} stdout
     * @param what
     * @param zipFile
     */
    zip(what: string, zipFile: string): Promise<string>;
}
export {};
