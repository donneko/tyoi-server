import type { StartOptions, ServerStartUseConfig } from "../../../types/server.type.js";
import type { CreateServerConfigDependencies } from "../../../types/dependencies/start-server/create-server-config.type.js";
import type { CreateServerConfigContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultCreateServerConfigDependencies } from "../dependencies/create-server-config.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function createServerConfig(
    options: StartOptions = {},
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

    const lan = context.serverConfig.getConfig("lan");
    const autoPort = context.serverConfig.getConfig("autoPort");
    const qr = context.serverConfig.getConfig("qr");
    const publicPath = context.serverConfig.getConfig("public");
    const browser = context.serverConfig.getConfig("browser");
    const api = context.serverConfig.getConfig("api");
    const configPort = context.serverConfig.getConfig("port");
    const signalClose = context.serverConfig.getConfig("signalClose");
    const publicFullPath = context.serverRegister.getConfig("publicDirectoryPath") ?? "";

    // ホスト設定
    const host = lan ? "0.0.0.0" : "127.0.0.1";

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
        lan,
        qr,
        publicPath,
        publicFullPath,
        browser,
        api,
        host,
        signalClose,
    };
}
