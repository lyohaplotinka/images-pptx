import { FilePaths } from '../interfaces';
export default class PptxGenerationService {
    private workingDirectory;
    private filePatterns;
    private outFile;
    private extension;
    private native;
    private fileStructure;
    private swigRenderer;
    private slides;
    constructor(workingDirectory: string, filePatterns: FilePaths, outFile?: string, extension?: string, native?: boolean);
    private assembleSlidesArray;
    generateContentTypes(): Promise<boolean>;
    generatePresentation(): Promise<boolean>;
    generatePptRels(): Promise<boolean>;
    generateSliderRels(): Promise<boolean>;
    generatePptx(): Promise<string>;
}
