import path from "node:path";
import { pathToFileURL } from "node:url";
import { Ask } from "@donneko/tyoi-logger";
import type { CmdMetaData } from "../types/tyoi-cli.type.js";
import { scanConfigFiles } from "../service/scan-config-files.js";
import { serverRuntime } from "../../process/main-process/main-process.js";

async function getConfigFile(
    processCwd: string,
    messageManager: CmdMetaData["meta"]["context"]["messageManager"]
): Promise<string | undefined> {
    const files = await scanConfigFiles(processCwd);

    if (files.length === 0) return;

    return await new Ask().select(messageManager.message("cli.config.select"), files);
}

export default async function runStartServer(data: CmdMetaData) {
    const cwd = data.meta.cli.cwd;
    const dirname = data.meta.cli.dirname;
    const messageManager = data.meta.context.messageManager;

    const file = await getConfigFile(cwd, messageManager);
    let useConfigPath: string = "";

    if (file) {
        const filePath = path.join(cwd, file);
        useConfigPath = pathToFileURL(filePath).href;
    }

    const configOption = {
        ...{ language: data.meta.config.language },
        ...data.meta.option,
        ...{ root: file ? cwd : dirname },
    };

    await serverRuntime(useConfigPath, configOption);
}
