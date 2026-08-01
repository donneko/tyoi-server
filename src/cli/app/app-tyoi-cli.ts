import { CommandHandler } from "@donneko/tyoi-cli";
import type { MetaData } from "../types/tyoi-cli.type.js";
import { getOnError } from "../service/app-tyoi-cli/on-error.js";
import { getMetaData } from "../service/app-tyoi-cli/meta-data.js";
import { addCommand } from "../service/app-tyoi-cli/add-command.js";

export async function tyoiCli() {
    const argv = process.argv.slice(2);

    const cmdHandler = new CommandHandler<MetaData>();
    const meta = await getMetaData(argv);
    cmdHandler.onError = () => {
        getOnError(meta.context.messageManager);
    };
    cmdHandler.meta = meta;
    meta.context.messageManager.setLanguage(meta.config.language);

    addCommand(cmdHandler);
    await cmdHandler.run(argv);
}
