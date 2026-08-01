import type { CmdMetaData } from "../types/tyoi-cli.type.js";
import { isValidationConfig } from "../service/app-tyoi-cli/cli-config/is-validation-config.js";
import { messageManager } from "../../messages/default-message-manager.js";

import path from "node:path";
import fs from "node:fs";

export default async function runSetting(data: CmdMetaData) {
    const cwd = data.meta.cli.cwd;
    const newConfig = { ...data.meta.config, [`${data.args[0]}`]: data.args[1] };

    if (!isValidationConfig(newConfig))
        throw new Error(messageManager.message("cli.setting.error"));

    const configPath = path.join(cwd, ".tyoi-server/config.json");
    data.meta.config = newConfig;

    fs.writeFileSync(configPath, JSON.stringify(newConfig));
}
