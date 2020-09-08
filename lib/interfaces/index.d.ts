export declare type FilePaths = string[] | string;
export interface IncludeFile {
    path: string;
    contents: string;
}
export interface IncludeFilesObject {
    [key: string]: IncludeFile;
}
export interface TemplateData {
    [key: string]: string | number;
}
export interface PresentationMeta {
    author?: string;
    title?: string;
    revision?: number;
    createdAt?: string;
}
export interface Settings {
    pictures: FilePaths;
    saveTo: string;
    extension?: string;
    pptxFileName?: string;
    native?: boolean;
    meta?: PresentationMeta;
}
