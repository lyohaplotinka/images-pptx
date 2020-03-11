/* eslint-disable @typescript-eslint/ban-ts-ignore */

/**
 * @jest-environment jsdom
 */

import FileStructureService from '../src/services/FileStructureService'

jest.mock('../src/utils', () => ({
  ncpCopy: (what: string, where: string): Promise<any> => {
    return Promise.resolve({ what, where })
  },
}))
jest.mock('fs')

beforeEach(() => {
  jest.resetModules()
  jest.resetAllMocks()
})

describe('FileStructureService', () => {
  let service: FileStructureService

  it('Creates class instance', () => {
    expect(() => {
      service = new FileStructureService('/test/directory', false)
    }).not.toThrowError()
  })

  it('Correctly sets working directory', () => {
    // @ts-ignore
    expect(service.workingDirectory).toBe('/test/directory')
  })

  it('Generates correct temp path', async () => {
    // @ts-ignore
    await service.makeRequiredStructure()
    expect(service.tempPath).toBe('/test/directory/pres.pptx.test')
  })

  it('Copies shared directory to the correct path', async () => {
    const sharedDirname = __dirname.replace('tests', 'shared')
    // @ts-ignore
    const copyShared: any = await service.copyShared()
    expect(copyShared.what).toBe(sharedDirname)
    expect(copyShared.where).toBe('/test/directory/pres.pptx.test')
  })

  it('Reading files from directory selects only files with needed extension', async () => {
    await service.readFilesFromDirectory('test', 'png')
    expect(service.pictures.length).toBe(1)
    expect(service.pictures[0]).toBe('test/test.png')
  })
})
