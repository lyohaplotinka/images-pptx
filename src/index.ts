import PptxGenerationService from './services/PptxGenerationService'
import { Settings } from './interfaces'

/**
 * @returns {Promise} path to file
 * @param settings
 */
export async function createPptx(settings: Settings): Promise<string | void> {
  console.time('::: PPTX generation')
  const service = new PptxGenerationService(
    settings.saveTo,
    settings.pictures,
    settings.pptxFileName,
    settings.extension,
    settings.native,
    settings.meta,
  )
  try {
    const result = await service.generatePptx()
    console.timeEnd('::: PPTX generation')
    return result
  } catch (err) {
    throw err
  }
}
