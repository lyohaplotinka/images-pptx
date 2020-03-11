import PptxGenerationService from './services/PptxGenerationService'
import { Settings } from './interfaces'

const ImagesPptx = async function(settings: Settings): Promise<string> {
  console.time('::: PPTX generation')
  const service = new PptxGenerationService(
    settings.saveTo,
    settings.pictures,
    settings.pptxFileName,
    settings.extension,
    settings.native,
  )
  const result = await service.generatePptx()
  console.timeEnd('::: PPTX generation')
  return result
}

export default ImagesPptx
