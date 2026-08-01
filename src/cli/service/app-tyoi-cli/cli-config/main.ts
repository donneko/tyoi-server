import { getConfigJson } from "./get-config-json.js";
import { isValidationConfig } from "./is-validation-config.js";
import { jsonToConfig } from "./json-to-config.js";
import { messageManager } from "../../../../messages/default-message-manager.js";

export default async function main() {
    const json = await getConfigJson();
    const meta = jsonToConfig(json);

    if (!isValidationConfig(meta)) throw Error(messageManager.message("cli.package.invalid"));

    return meta;
}
