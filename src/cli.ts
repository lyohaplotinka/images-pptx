#!/usr/bin/env node

import argv from './argv'
import PptxGenerationService from './services/PptxGenerationService'
import { promises } from 'fs'
import { Settings } from './interfaces'

const { lstat } = promises

async function cliWork(): Promise<string> {
  const args = argv
  const saveTo = args['save-to']
  let pictures: string | string[] =
    args.pictures.length > 1 ? (args.pictures as string[]) : (args.pictures[0] as string)
  if (Array.isArray(pictures)) {
    for (const picture of pictures) {
      const stats = await lstat(picture).catch(err => {
        throw new Error(`CLI error while getting stats of picture: "${err.message}"`)
      })
      if (stats.isDirectory()) {
        pictures = picture
        break
      }
    }
  }
  const pptxFileName = args['out-file-name']
  const extension = args.ext
  const native = args.native
  const author = args.author
  const title = args.title
  const revision = args.revision
  const createdAt = args['created-at']
  const settings: Settings = {
    saveTo,
    pictures,
    pptxFileName,
    extension,
    native,
    meta: {
      author,
      title,
      revision,
      createdAt,
    },
  }
  try {
    const service = new PptxGenerationService(
      settings.saveTo,
      settings.pictures,
      settings.pptxFileName,
      settings.extension,
      settings.native,
      settings.meta,
    )
    return await service.generatePptx()
  } catch (e) {
    throw e
  }
}

cliWork()
  .then(result => console.log(`:: Generated PPTX file: ${result}`))
  .catch(e => {
    console.error(e)
  })
