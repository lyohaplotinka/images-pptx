export default `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
                   xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"
                   xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <dc:title>{{ presentation.title }}</dc:title>
    <dc:creator>{{ presentation.author }}</dc:creator>
    <cp:lastModifiedBy>{{ presentation.author }}</cp:lastModifiedBy>
    <cp:revision>{{ presentation.revision }}</cp:revision>
    <dcterms:created xsi:type="dcterms:W3CDTF">{{ presentation.createdAt }}</dcterms:created>
    <dcterms:modified xsi:type="dcterms:W3CDTF">{{ presentation.createdAt }}</dcterms:modified>
</cp:coreProperties>`
