import type { MetaData } from "../../types/tyoi-cli.type.js";
import { MessageManager } from "../../../messages/index.js";
import { fileURLToPath } from "node:url";
export function createContext(): MetaData["context"] {
    const languagesPath = fileURLToPath(new URL("../../../../languages", import.meta.url));

    return {
        messageManager: new MessageManager("ja-JP", languagesPath),
    };
}
