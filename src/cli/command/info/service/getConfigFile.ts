import { Ask } from "@donneko/tyoi-logger";
import { scanConfigFiles } from "../../../service/scan-config-files.js";
import type { MessageManager } from "../../../../messages/index.js";

export async function getConfigFile(
    processCwd: string,
    messageManager: MessageManager
): Promise<string | undefined> {
    const files = await scanConfigFiles(processCwd);

    if (files.length === 0) return;

    return await new Ask().select(messageManager.message("cli.config.select"), files);
}
