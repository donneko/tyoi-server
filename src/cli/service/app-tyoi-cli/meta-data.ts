import { getOption } from "./option.js";
import path from "node:path";
import type { MetaData } from "../../types/tyoi-cli.type.js";
import getPackData from "./pack-data/main.js";
import getConfig from "./cli-config/main.js";
import { createContext } from "./create-context.js";

export async function getMetaData(argv: string[]): Promise<MetaData> {
    const context = createContext();
    return {
        pack: await getPackData(context.messageManager),
        cli: {
            cwd: process.cwd(),
            dirname: path.join(import.meta.dirname, "../../../"),
        },
        config: await getConfig(context.messageManager),
        option: getOption(argv),
        context,
    };
}
