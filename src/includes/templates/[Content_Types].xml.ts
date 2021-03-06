export default `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="png" ContentType="image/png"/>
    <Default Extension="jpeg" ContentType="image/jpeg"/>
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Default Extension="JPG" ContentType="image/jpeg"/>
    <Override PartName="/ppt/presentation.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
    <Override PartName="/ppt/slideMasters/slideMaster1.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
    <Override PartName="/ppt/slides/slide1.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
    {% for slide in slides %}
    <Override PartName="/ppt/slides/{{ slide.title }}.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>
    {% endfor %}
    <Override PartName="/ppt/presProps.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
    <Override PartName="/ppt/viewProps.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>
    <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
    <Override PartName="/ppt/tableStyles.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>
    <Override PartName="/ppt/slideLayouts/slideLayout1.xml"
              ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
    <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
    <Override PartName="/docProps/app.xml"
              ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
`
