export default `<?xml version="1.0" encoding="UTF-8" ?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles"
                  Target="tableStyles.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"
                  Target="slides/slide1.xml"/>
    {% for slide in slides %}
        <Relationship Id="{{ slide.rId }}"
                      Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide"
                      Target="slides/{{ slide.title }}.xml"/>
    {% endfor %}
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster"
                  Target="slideMasters/slideMaster1.xml"/>
    <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme"
                  Target="theme/theme1.xml"/>
    <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps"
                  Target="viewProps.xml"/>
    <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps"
                  Target="presProps.xml"/>
</Relationships>
`
