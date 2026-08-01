import { getConfigJson } from "./get-config-json.js";
import { isValidationConfig } from "./is-validation-config.js";
import { jsonToConfig } from "./json-to-config.js";
import type { MessageManager } from "../../../../messages/index.js";

export default async function main(messageManager: MessageManager) {
    const json = await getConfigJson();
    const meta = jsonToConfig(json);

    if (!isValidationConfig(meta)) throw Error(messageManager.message("cli.package.invalid"));

    return meta;
}
