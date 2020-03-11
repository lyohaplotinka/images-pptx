import ContentTypesTemplate from './templates/[Content_Types].xml'
import PresentationTemplate from './templates/ppt/presentation.xml'
import PptRelsTemplate from './templates/ppt/_rels/presentation.xml.rels'
import SlidesRelsTemplate from './templates/ppt/slides/_rels/slide1.xml.rels'
import { IncludeFilesObject } from '../interfaces'

const Templates: IncludeFilesObject = {
  ContentTypes: {
    path: '/',
    contents: ContentTypesTemplate,
  },
  PresentationTemplate: {
    path: '/ppt/',
    contents: PresentationTemplate,
  },
  PptRelsTemplate: {
    path: '/ppt/_rels/',
    contents: PptRelsTemplate,
  },
  SlidesRelsTemplate: {
    path: '/ppt/slides/_rels/',
    contents: SlidesRelsTemplate,
  },
}

export default Templates
