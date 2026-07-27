import type { ServerStartOptions, ServerStartUseConfig } from "../../../types/server.type.js";
import type { CreateServerConfigDependencies } from "../../../types/dependencies/start-server/create-server-config.type.js";
import type { CreateServerConfigContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultCreateServerConfigDependencies } from "../dependencies/create-server-config.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function createServerConfig(
    options: ServerStartOptions = {},
    context: CreateServerConfigContext,
    dependencies: Partial<CreateServerConfigDependencies> = {}
): Promise<ServerStartUseConfig> {
    const deps = createDependencies<CreateServerConfigDependencies>(
        defaultCreateServerConfigDependencies,
        dependencies
    );

    if (options) {
        context.serverConfig.updateConfig(options);
    }

    const exposeLan = context.serverConfig.getConfig("exposeLan");
    const autoPort = context.serverConfig.getConfig("autoPort");
    const showQrCode = context.serverConfig.getConfig("showQrCode");
    const publicPath = context.serverConfig.getConfig("publicDirname");
    const openBrowser = context.serverConfig.getConfig("openBrowser");
    const apiPrefix = context.serverConfig.getConfig("apiPrefix");
    const configPort = context.serverConfig.getConfig("port");
    const signalShutdownHandling = context.serverConfig.getConfig("signalShutdownHandling");
    const publicFullPath = context.serverRegister.getConfig("publicDirectoryPath") ?? "";

    // ホスト設定
    const host = exposeLan ? "0.0.0.0" : "127.0.0.1";

    // ポート設定
    const port = await deps.findAvailablePort(
        {
            startPort: configPort,
            host,
            isAutoPort: autoPort,
        },
        context
    );

    return {
        port,
        exposeLan,
        showQrCode,
        publicPath,
        publicFullPath,
        openBrowser,
        apiPrefix,
        host,
        signalShutdownHandling,
    };
}
