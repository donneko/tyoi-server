import { Ask } from "@donneko/tyoi-logger";
import { scanConfigFiles } from "../../../service/scan-config-files.js";

export async function getConfigFile(processCwd: string): Promise<string | undefined> {
    const files = await scanConfigFiles(processCwd);

    if (files.length === 0) return;

    return await new Ask().select("使用する設定ファイルを選択してください。", files);
}
