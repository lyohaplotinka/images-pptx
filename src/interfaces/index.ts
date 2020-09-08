export type FilePaths = string[] | string

export interface IncludeFile {
  path: string
  contents: string
}

export interface IncludeFilesObject {
  [key: string]: IncludeFile
}

export interface TemplateData {
  [key: string]: string | number
}

export interface PresentationMeta {
  author?: string
  title?: string
  revision?: number
  createdAt?: string
}

export interface Settings {
  pictures: FilePaths // Array of files or file patterns (f.e. /pictures/*.jpg)
  saveTo: string // Where exactly pptx file will be saved
  extension?: string
  pptxFileName?: string
  native?: boolean
  meta?: PresentationMeta
}
