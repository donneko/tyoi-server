import type { CreateExpressConfigContext } from "../../../types/context/setup-express/stop-express.type.js";
import type { ServerCreateExpressConfigReturn } from "../../../types/server.type.js";

export function createExpressConfig(
    context: CreateExpressConfigContext
): ServerCreateExpressConfigReturn {
    const middlewares = context.serverConfig.getConfig("middlewares");
    const apiPrefix = context.serverConfig.getConfig("apiPrefix");
    const publicDirectoryPath = context.serverRegister.getConfig("publicDirectoryPath") ?? "";

    return { middlewares, apiPrefix, publicDirectoryPath };
}
