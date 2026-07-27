import type { CreateServerConfigContext } from "../../../types/context/setup-server/setup-server.type.js";
import type { ServerCreateServerConfigReturn } from "../../../types/server.type.js";

export function createServerConfig(
    context: CreateServerConfigContext
): ServerCreateServerConfigReturn {
    const baseDirname = context.serverConfig.getConfig("baseDirname");
    const publicDirname = context.serverConfig.getConfig("publicDirname");
    const signalShutdownHandling = context.serverConfig.getConfig("signalShutdownHandling");

    if (!baseDirname) throw new Error("baseDirname is required");

    return {
        baseDirname,
        publicDirname,
        signalShutdownHandling,
    };
}
