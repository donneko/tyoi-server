import { getOption } from "./option.js";
import path from "node:path";
import type { MetaData } from "../../types/tyoi-cli.type.js";
import getPackData from "./pack-data/main.js";
import getConfig from "./cli-config/main.js";
import { MessageManager } from "../../../messages/message-manager.js";
import { fileURLToPath } from "node:url";

export async function getMetaData(argv: string[]): Promise<MetaData> {
    const languagesPath = fileURLToPath(new URL("../../../../languages", import.meta.url));
    return {
        pack: await getPackData(),
        cli: {
            cwd: process.cwd(),
            dirname: path.join(import.meta.dirname, "../../../"),
        },
        config: await getConfig(),
        option: getOption(argv),
        context: {
            messageManager: new MessageManager("ja-JP", languagesPath),
        },
    };
}
