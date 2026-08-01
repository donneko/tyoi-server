import { getPackageJson } from "./get-package-json.js";
import { getPackagePath } from "./get-package-path.js";
import { isValidationMeta } from "./is-validation-meta.js";
import { jsonToMeta } from "./json-to-meta.js";
import type { MessageManager } from "../../../../messages/index.js";

export default async function main(messageManager: MessageManager) {
    const path = getPackagePath();
    const json = await getPackageJson(path);
    const meta = jsonToMeta(json);

    if (!isValidationMeta(meta)) throw Error(messageManager.message("cli.package.invalid"));

    return meta;
}
