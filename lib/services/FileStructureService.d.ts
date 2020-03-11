export default class FileStructureService {
    private workingDirectory;
    private native;
    tempPath: string;
    pictures: string[];
    private command?;
    /**
     *
     * @param workingDirectory
     * @param native
     */
    constructor(workingDirectory: string, native?: boolean);
    private copyShared;
    private copyPictures;
    /**
     * @returns {boolean}
     * @param slidesCount
     */
    private copySlides;
    makeRequiredStructure(): Promise<boolean>;
    makeRestStructure(): Promise<boolean>;
    /**
     *
     * @param path
     * @param extension
     */
    readFilesFromDirectory(path: string, extension: string): Promise<void>;
    /**
     *
     * @param outFile
     */
    packAndClean(outFile: string): Promise<void>;
}
