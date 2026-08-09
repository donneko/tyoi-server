import type { CreateExpressConfigContext } from "../../../types/context/setup-express/stop-express.type.js";
import type { ServerCreateExpressConfigReturn } from "../../../types/server.type.js";

export function createExpressConfig(
    context: CreateExpressConfigContext
): ServerCreateExpressConfigReturn {
    const middlewares = context.serverConfig.getConfig("middlewares");
    const api = context.serverConfig.getConfig("api");
    const publicDirectoryPath = context.serverRegister.getConfig("publicDirectoryPath") ?? "";

    return { middlewares, api, publicDirectoryPath };
}
