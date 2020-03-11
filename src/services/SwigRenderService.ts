import { Swig, SwigOptions } from 'swig'
import { IncludeFile, TemplateData } from '../interfaces'
import { promises } from 'fs'
import { join as pathJoin } from 'path'

const { writeFile } = promises

export default class SwigRenderService {
  /**
   *
   * @param workingDirectory
   */
  constructor(private workingDirectory: string) {}

  /**
   *
   * @param template
   * @param data
   * @param fileName
   */
  public async renderTemplate(template: IncludeFile, data: TemplateData, fileName: string): Promise<boolean> {
    const options: SwigOptions = {
      locals: data,
    }
    try {
      const renderedTemplate = new Swig().render(template.contents, options)
      await writeFile(pathJoin(this.workingDirectory, template.path, fileName), renderedTemplate, 'utf8')
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
}
