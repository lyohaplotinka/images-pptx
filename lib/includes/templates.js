"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _Content_Types__xml_1 = require("./templates/[Content_Types].xml");
var presentation_xml_1 = require("./templates/ppt/presentation.xml");
var presentation_xml_rels_1 = require("./templates/ppt/_rels/presentation.xml.rels");
var slide1_xml_rels_1 = require("./templates/ppt/slides/_rels/slide1.xml.rels");
var core_xml_1 = require("./templates/docProps/core.xml");
var Templates = {
    ContentTypes: {
        path: '/',
        contents: _Content_Types__xml_1.default,
    },
    PresentationTemplate: {
        path: '/ppt/',
        contents: presentation_xml_1.default,
    },
    PptRelsTemplate: {
        path: '/ppt/_rels/',
        contents: presentation_xml_rels_1.default,
    },
    SlidesRelsTemplate: {
        path: '/ppt/slides/_rels/',
        contents: slide1_xml_rels_1.default,
    },
    DocPropsCoreTemplate: {
        path: '/docProps/',
        contents: core_xml_1.default,
    },
};
exports.default = Templates;
//# sourceMappingURL=templates.js.map