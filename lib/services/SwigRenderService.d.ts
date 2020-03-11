import { IncludeFile, TemplateData } from '../interfaces';
export default class SwigRenderService {
    private workingDirectory;
    constructor(workingDirectory: string);
    renderTemplate(template: IncludeFile, data: TemplateData, fileName: string): Promise<boolean>;
}
