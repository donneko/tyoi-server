import type { CreateServerConfigContext } from "../../../types/context/setup-server/setup-server.type.js";
import type { ServerCreateServerConfigReturn } from "../../../types/server.type.js";

export function createServerConfig(
    context: CreateServerConfigContext
): ServerCreateServerConfigReturn {
    const root = context.serverConfig.getConfig("root");
    const publicDirectory = context.serverConfig.getConfig("public");
    const signalClose = context.serverConfig.getConfig("signalClose");

    if (!root) throw new Error("root is required");

    return {
        root,
        public: publicDirectory,
        signalClose,
    };
}
