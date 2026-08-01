import { Logger } from "@donneko/tyoi-logger";
import type { MessageManager } from "../../../../messages/index.js";

export function showNextSteps(messageManager: MessageManager): void {
    const logger = new Logger();

    logger.bar();
    logger.success(messageManager.message("cli.nextSteps.start"));
    logger.info("npx tyoi run");
    logger.bar();
}
