#!/usr/bin/env ts-node

import argv from './argv'
import PptxGenerationService from './services/PptxGenerationService'
import { promises } from 'fs'

const { lstat } = promises

async function cliWork(): Promise<string | Error> {
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
  console.log({
    saveTo,
    pictures,
  })
}

cliWork()
