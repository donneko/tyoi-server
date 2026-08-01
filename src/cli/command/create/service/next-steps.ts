import { Logger } from "@donneko/tyoi-logger";
import { messageManager } from "../../../../messages/default-message-manager.js";

export function showNextSteps(projectName: string): void {
    const logger = new Logger();

    logger.bar();
    logger.success(messageManager.message("cli.nextSteps.start"));
    logger.info(`cd ${projectName}`);
    logger.info("npm install");
    logger.info("npm run dev");
    logger.bar();
}
