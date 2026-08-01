import type { CmdMetaData } from "../types/tyoi-cli.type.js";
import { isValidationConfig } from "../service/app-tyoi-cli/cli-config/is-validation-config.js";

import path from "node:path";
import fs from "node:fs";

export default async function runSetting(data: CmdMetaData) {
    const cwd = data.meta.cli.cwd;
    const messageManager = data.meta.context.messageManager;
    const newConfig = { ...data.meta.config, ...{ [`${data.args[0]}`]: data.args[1] } };

    if (!isValidationConfig(newConfig))
        throw new Error(messageManager.message("cli.setting.error"));

    data.meta.config = newConfig;
    data.meta.context.messageManager.setLanguage(newConfig.language);

    const configPath = path.join(cwd, ".tyoi-server/config.json");
    const dirPath = path.dirname(configPath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(newConfig), "utf-8");
}
