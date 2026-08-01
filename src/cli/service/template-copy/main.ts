import {
    appTemplateCopy,
    type AppTemplateCopyData,
    type AppTemplateCopyReturn,
} from "./app/app.js";
import type { MessageManager } from "../../../messages/index.js";

export default async function main(
    data: AppTemplateCopyData,
    messageManager: MessageManager
): Promise<AppTemplateCopyReturn> {
    return await appTemplateCopy(data, messageManager);
}
