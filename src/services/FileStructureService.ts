import { createWriteStream, promises } from 'fs'
import { join as pathJoin, extname } from 'path'
import { ncpCopy } from '../utils'
import * as archiver from 'archiver'
import * as rimraf from 'rimraf'
import NativeLaunchService from './NativeLaunchService'

const { readdir, mkdtemp, mkdir } = promises

export default class FileStructureService {
  public tempPath = ''
  public pictures: string[] = []
  private command?: NativeLaunchService

  /**
   *
   * @param workingDirectory
   * @param native
   */
  constructor(private workingDirectory: string, private native = false) {
    if (this.native) this.command = new NativeLaunchService()
  }

  private async copyShared(): Promise<{ what: string; where: string }> {
    const sharedDir = pathJoin(__dirname, '../../shared')
    const pptMediaDir = pathJoin(this.tempPath, 'ppt/media')
    const pptRelsDir = pathJoin(this.tempPath, 'ppt/_rels')
    if (this.native) {
      await this.command?.copy(sharedDir + '/.', this.tempPath)
      await this.command?.mkdir(pptMediaDir)
      await this.command?.mkdir(pptRelsDir)
    } else {
      await ncpCopy(sharedDir, this.tempPath)
      await mkdir(pptMediaDir)
      await mkdir(pptRelsDir)
    }
    return {
      what: sharedDir,
      where: this.tempPath,
    }
  }

  private async copyPictures(): Promise<boolean> {
    const promisesArray: Promise<any>[] = []
    let counter = 0
    for (const picture of this.pictures) {
      const from = picture
      const to = pathJoin(this.tempPath, 'ppt/media', `slide-${counter}${extname(picture)}`)
      promisesArray.push(this.native ? this.command!.copy(from, to) : ncpCopy(from, to))
      counter++
    }
    return Promise.all(promisesArray)
      .then(() => true)
      .catch(err => {
        console.error(err)
        throw new Error(`Error during copying pictures: "${err.message}"`)
      })
  }

  /**
   * @returns {boolean}
   * @param slidesCount
   */
  private async copySlides(slidesCount: number): Promise<boolean> {
    const promisesArray: Promise<void>[] = []
    for (let i = 0; i < slidesCount; i++) {
      const from = pathJoin(this.tempPath, 'ppt/slides/slide1.xml')
      const to = pathJoin(this.tempPath, `ppt/slides/slide-${i}.xml`)
      const promise: Promise<any> = this.native ? this.command!.copy(from, to) : ncpCopy(from, to)
      promisesArray.push(promise)
    }
    return Promise.all(promisesArray)
      .then(() => true)
      .catch(err => {
        console.log(err)
        throw new Error(`Error during creating slides: "${err.message}"`)
      })
  }

  public async makeRequiredStructure(): Promise<boolean> {
    this.tempPath = await mkdtemp(pathJoin(this.workingDirectory, 'pres.pptx.')).catch(err => {
      console.error(err)
      throw new Error(`Error during creating temp directory: "${err.message}"`)
    })
    await this.copyShared().catch(err => {
      console.error(err)
      throw new Error(`Error during creating base file structure: "${err.message}"`)
    })
    return true
  }

  public async makeRestStructure(): Promise<boolean> {
    const promisesArray: Promise<boolean>[] = [this.copyPictures(), this.copySlides(this.pictures.length)]
    return Promise.all(promisesArray)
      .then(() => true)
      .catch(err => {
        throw new Error(`File structure error: "${err.message}"`)
      })
  }

  /**
   *
   * @param path
   * @param extension
   */
  public readFilesFromDirectory(path: string, extension: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      readdir(path)
        .then(allFiles => {
          const regExp = new RegExp(`.${extension}`, 'gi')
          this.pictures = allFiles.reduce((total: string[], current: string) => {
            if (current.match(regExp)) {
              total.push(pathJoin(path, current))
            }
            return total
          }, [])
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject(new Error(`Error during reading files from directory: "${err.message}"`))
        })
    })
  }

  /**
   *
   * @param outFile
   */
  public packAndClean(outFile: string): Promise<void> {
    if (this.native && this.command?.osType !== 'windows') {
      return new Promise(resolve => {
        return this.command!.zip(this.tempPath, pathJoin(this.workingDirectory, outFile)).then(() => {
          return this.command!.rm(this.tempPath)
            .then(() => resolve())
            .catch(err => {
              throw new Error(`Error during native PPTX packing: "${err.message}"`)
            })
        })
      })
    } else {
      const out = pathJoin(this.workingDirectory, outFile)
      const archive = archiver('zip', { zlib: { level: 9 } })
      const stream = createWriteStream(out)

      return new Promise((resolve, reject) => {
        archive
          .directory(this.tempPath, false)
          .on('error', (err: any) => reject(err))
          .pipe(stream)

        stream.on('close', () => resolve())
        archive.finalize().then(() => {
          rimraf(this.tempPath, error => {
            if (error) {
              console.error(error)
              throw new Error(`Error during non-native PPTX packing: "${error.message}"`)
            }
          })
        })
      })
    }
  }
}
