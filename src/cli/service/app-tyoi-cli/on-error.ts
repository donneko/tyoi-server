import { Logger } from "@donneko/tyoi-logger";
import { messageManager } from "../../../messages/default-message-manager.js";

export function getOnError() {
    const logger = new Logger();

    logger.bar();
    logger.warn(messageManager.message("cli.command.unknown"));
    logger.info(messageManager.message("cli.command.helpHint"));
}
