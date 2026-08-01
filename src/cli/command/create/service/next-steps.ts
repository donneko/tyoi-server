import { Logger } from "@donneko/tyoi-logger";
import type { MessageManager } from "../../../../messages/index.js";

export function showNextSteps(projectName: string, messageManager: MessageManager): void {
    const logger = new Logger();

    logger.bar();
    logger.success(messageManager.message("cli.nextSteps.start"));
    logger.info(`cd ${projectName}`);
    logger.info("npm install");
    logger.info("npm run dev");
    logger.bar();
}
