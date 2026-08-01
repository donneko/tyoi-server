import path from "node:path";
import { readDirectory } from "../../read-directory.js";
import { Ask, Logger } from "@donneko/tyoi-logger";
import { isValidTemplate } from "../core/is-valid-template.js";
import { messageManager } from "../../../../messages/default-message-manager.js";

export async function getTemplatePath(
    templateName: string | undefined,
    base: string,
    templatePath: string
): Promise<string> {
    const readPath = path.join(base, templatePath);
    const templateFiles = await readDirectory(readPath, false);
    const ask = new Ask();
    const logger = new Logger();

    let template = templateName;

    if (template) {
        if (isValidTemplate(template, templateFiles)) {
            return path.join(readPath, template);
        }

        throw new Error(messageManager.message("cli.template.notFound", { template }));
    }

    template = await ask.select(messageManager.message("cli.template.select"), templateFiles);

    if (!template) {
        throw new Error(
            messageManager.message("cli.template.notSelected", { template: String(template) })
        );
    }

    logger.info(messageManager.message("cli.template.selected", { template }));
    return path.join(readPath, template);
}
