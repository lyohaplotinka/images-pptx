declare const _default: "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">\n    <Relationship Id=\"rId7\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles\"\n                  Target=\"tableStyles.xml\"/>\n    <Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide\"\n                  Target=\"slides/slide1.xml\"/>\n    {% for slide in slides %}\n        <Relationship Id=\"{{ slide.rId }}\"\n                      Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide\"\n                      Target=\"slides/{{ slide.title }}.xml\"/>\n    {% endfor %}\n    <Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster\"\n                  Target=\"slideMasters/slideMaster1.xml\"/>\n    <Relationship Id=\"rId6\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme\"\n                  Target=\"theme/theme1.xml\"/>\n    <Relationship Id=\"rId5\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps\"\n                  Target=\"viewProps.xml\"/>\n    <Relationship Id=\"rId4\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps\"\n                  Target=\"presProps.xml\"/>\n</Relationships>\n";
export default _default;