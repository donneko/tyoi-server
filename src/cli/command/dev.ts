import type { CmdMetaData } from "../types/tyoi-cli.type.js";
import { serverRuntime } from "../../process/main-process/main-process.js";
import path from "node:path";
import { pathToFileURL } from "node:url";

export default async function runDevServer(data: CmdMetaData) {
    const mainDirname = data.meta.cli.dirname;

    // 設定パスの作成
    const useConfigPath = pathToFileURL(
        path.join(import.meta.dirname, "../../config/tyoi.dev.config.js")
    ).href;

    const configOption = {
        ...{ language: data.meta.config.language },
        ...data.meta.option,
        ...{ baseDirname: mainDirname },
    };

    // サーバー起動
    await serverRuntime(useConfigPath, configOption);
}
