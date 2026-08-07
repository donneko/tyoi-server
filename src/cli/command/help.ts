import type { CmdMetaData } from "../types/tyoi-cli.type.js";
import { Logger } from "@donneko/tyoi-logger";

export default function serverHelp(data: CmdMetaData) {
    const messageManager = data.meta.context.messageManager;

    const logger = new Logger();

    logger.window(messageManager.message("cli.help.title"), [
        logger.createInfo(messageManager.message("cli.help.introduction")),
        logger.createBar(),
        logger.createMessage(messageManager.message("cli.help.help")),
        logger.createMessage(messageManager.message("cli.help.init")),
        logger.createMessage(messageManager.message("cli.help.run")),
        logger.createMessage(messageManager.message("cli.help.create")),
        logger.createMessage(messageManager.message("cli.help.config")),
        logger.createMessage(messageManager.message("cli.help.info")),
        logger.createMessage(messageManager.message("cli.help.setting")),
    ]);
}
