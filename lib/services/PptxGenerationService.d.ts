import { FilePaths, PresentationMeta } from '../interfaces';
export default class PptxGenerationService {
    private workingDirectory;
    private filePatterns;
    private outFile;
    private extension;
    private native;
    private meta;
    private fileStructure;
    private swigRenderer;
    private slides;
    /**
     *
     * @param workingDirectory
     * @param filePatterns
     * @param outFile
     * @param extension
     * @param native
     * @param meta
     */
    constructor(workingDirectory: string, filePatterns: FilePaths, outFile?: string, extension?: string, native?: boolean, meta?: PresentationMeta);
    private assembleSlidesArray;
    generateContentTypes(): Promise<boolean>;
    generatePresentation(): Promise<boolean>;
    generatePptRels(): Promise<boolean>;
    generatePresentationMeta(): Promise<boolean>;
    generateSliderRels(): Promise<boolean>;
    generatePptx(): Promise<string>;
}
