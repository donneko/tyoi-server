import { Logger } from "@donneko/tyoi-logger";
import { messageManager } from "../../../../messages/default-message-manager.js";

export function showNextSteps(): void {
    const logger = new Logger();

    logger.bar();
    logger.success(messageManager.message("cli.nextSteps.start"));
    logger.info("npx tyoi run");
    logger.bar();
}
