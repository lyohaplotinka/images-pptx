/* eslint-disable @typescript-eslint/ban-ts-ignore */
/**
 * @jest-environment jsdom
 */

import SwigRenderService from '../src/services/SwigRenderService'
import { TemplateData } from '../src/interfaces'
import * as fs from 'fs'

jest.mock('fs')

const TEST_TEMPLATE = {
  path: '/path/to/test/temp',
  contents: `{% for word in data %}{{word}}{% endfor %}`,
}

describe('SwigRenderService.ts', () => {
  const workingDirectory = '/test/swig'
  let service: SwigRenderService

  it('Creates class instance', () => {
    expect(() => {
      service = new SwigRenderService(workingDirectory)
    }).not.toThrowError()
  })

  it('Renders template correctly and saves to correct path', async () => {
    const data: TemplateData = {
      // @ts-ignore
      data: ['one', 'two', 'three'],
    }
    await service.renderTemplate(TEST_TEMPLATE, data, 'temp')
    // @ts-ignore
    expect(fs.promises.__test.data).toBe('onetwothree')
    // @ts-ignore
    expect(fs.promises.__test.path).toBe('/test/swig/path/to/test/temp/temp')
  })
})
