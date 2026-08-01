import { fileURLToPath } from "node:url";
import { MessageManager } from "./message-manager.js";

const languagesPath = fileURLToPath(new URL("../../languages", import.meta.url));

export const messageManager = new MessageManager("ja-JP", languagesPath);
