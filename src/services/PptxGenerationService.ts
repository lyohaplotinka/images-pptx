import { basename, join as pathJoin, extname } from 'path'
import { FilePaths, PresentationMeta } from '../interfaces'
import FileStructureService from './FileStructureService'
import SwigRenderService from './SwigRenderService'
import Templates from '../includes/templates'

export default class PptxGenerationService {
  private fileStructure!: FileStructureService
  private swigRenderer!: SwigRenderService
  private slides: any[] = []

  /**
   *
   * @param workingDirectory
   * @param filePatterns
   * @param outFile
   * @param extension
   * @param native
   * @param meta
   */
  constructor(
    private workingDirectory: string,
    private filePatterns: FilePaths,
    private outFile = 'presentation.pptx',
    private extension: string = 'jpg',
    private native = false,
    private meta: PresentationMeta = {},
  ) {}

  private assembleSlidesArray(): void {
    let currentId = 7
    let counter = -1
    let specialId = 255
    this.slides = this.fileStructure.pictures.map((picture: string) => {
      currentId++
      counter++
      specialId++
      return {
        id: currentId,
        specialId: specialId,
        rId: `rId${currentId}`,
        title: `slide-${counter}`,
        picture: basename(picture),
        renamedPicture: `slide-${counter}${extname(picture)}`,
      }
    })
  }

  public async generateContentTypes(): Promise<boolean> {
    const locals: any = {
      slides: this.slides,
    }
    return await this.swigRenderer.renderTemplate(Templates.ContentTypes, locals, '[Content_Types].xml')
  }

  public async generatePresentation(): Promise<boolean> {
    const locals: any = {
      slides: this.slides,
    }
    return await this.swigRenderer.renderTemplate(Templates.PresentationTemplate, locals, 'presentation.xml')
  }

  public async generatePptRels(): Promise<boolean> {
    const locals: any = {
      slides: this.slides,
    }
    return await this.swigRenderer.renderTemplate(Templates.PptRelsTemplate, locals, 'presentation.xml.rels')
  }

  public async generatePresentationMeta(): Promise<boolean> {
    const locals: any = {
      presentation: {
        title: this.meta?.title || 'Images-pptx presentation',
        author: this.meta?.author || 'Images-pptx',
        createdAt: this.meta?.createdAt || new Date().toISOString(),
        revision: this.meta?.revision ?? 1,
      },
    }
    return await this.swigRenderer.renderTemplate(Templates.DocPropsCoreTemplate, locals, 'core.xml')
  }

  public async generateSliderRels(): Promise<boolean> {
    let counter = 0
    const promisesArray: Promise<boolean>[] = []
    for (const slide of this.slides) {
      promisesArray.push(
        this.swigRenderer.renderTemplate(Templates.SlidesRelsTemplate, { slide }, `slide-${counter}.xml.rels`),
      )
      counter++
    }
    const result = await Promise.all(promisesArray)
    return result.find(res => res === false) === undefined
  }

  public async generatePptx(): Promise<string> {
    this.fileStructure = new FileStructureService(this.workingDirectory, this.native)
    if (Array.isArray(this.filePatterns)) {
      this.fileStructure.pictures = this.filePatterns
    } else {
      await this.fileStructure.readFilesFromDirectory(this.filePatterns as string, this.extension)
    }
    this.assembleSlidesArray()
    await this.fileStructure.makeRequiredStructure().catch(err => {
      throw err
    })
    this.swigRenderer = new SwigRenderService(this.fileStructure.tempPath)

    const promisesArray: Promise<boolean>[] = [
      this.fileStructure.makeRestStructure(),
      this.generateContentTypes(),
      this.generatePptRels(),
      this.generatePresentation(),
      this.generateSliderRels(),
      this.generatePresentationMeta(),
    ]
    return Promise.all(promisesArray)
      .then(() => {
        return this.fileStructure
          .packAndClean(this.outFile)
          .then(() => {
            return pathJoin(this.workingDirectory, this.outFile)
          })
          .catch(err => {
            console.error(err)
            throw err
          })
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }
}
