import path from "node:path";
import { Ask, Logger } from "@donneko/tyoi-logger";
import { isValidProjectName } from "../core/is-valid-project-name.js";
import { messageManager } from "../../../../messages/default-message-manager.js";

export async function getProjectName(
    inputName: string | undefined,
    target: string
): Promise<string> {
    let projectName = inputName;
    const ask = new Ask();
    const logger = new Logger();

    if (!projectName) {
        const defaultName = path.basename(target);
        const InputProjectName =
            (await ask.input(messageManager.message("cli.project.input", { defaultName }))) ??
            defaultName;

        projectName = InputProjectName;
    }

    if (!isValidProjectName(projectName)) {
        throw Error(messageManager.message("cli.project.invalidName", { projectName }));
    }

    logger.info(messageManager.message("cli.project.selected", { projectName }));
    return projectName;
}
