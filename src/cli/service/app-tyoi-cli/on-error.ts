import { Logger } from "@donneko/tyoi-logger";
import type { MessageManager } from "../../../messages/index.js";

export function getOnError(messageManager: MessageManager) {
    const logger = new Logger();

    logger.bar();
    logger.warn(messageManager.message("cli.command.unknown"));
    logger.info(messageManager.message("cli.command.helpHint"));
}
