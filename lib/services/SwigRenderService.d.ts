import { IncludeFile, TemplateData } from '../interfaces';
export default class SwigRenderService {
    private workingDirectory;
    /**
     *
     * @param workingDirectory
     */
    constructor(workingDirectory: string);
    /**
     *
     * @param template
     * @param data
     * @param fileName
     */
    renderTemplate(template: IncludeFile, data: TemplateData, fileName: string): Promise<boolean>;
}
