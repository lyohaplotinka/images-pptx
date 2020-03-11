export default class FileStructureService {
    private workingDirectory;
    private native;
    tempPath: string;
    pictures: string[];
    private command?;
    constructor(workingDirectory: string, native?: boolean);
    private copyShared;
    private copyPictures;
    private copySlides;
    makeRequiredStructure(): Promise<boolean>;
    makeRestStructure(): Promise<boolean>;
    readFilesFromDirectory(path: string, extension: string): Promise<void>;
    packAndClean(outFile: string): Promise<void>;
}
