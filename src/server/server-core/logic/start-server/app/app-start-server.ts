import type http from "node:http";
import type { StartOptions } from "../../../types/server.type.js";
import type { ServerStartDependencies } from "../../../types/dependencies/start-server/server-start.type.js";
import type { ServerStartContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultServerStartDependencies } from "../dependencies/server-start.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function startServer(
    options: StartOptions = {},
    context: ServerStartContext,
    dependencies: Partial<ServerStartDependencies> = {}
): Promise<http.Server> {
    const deps = createDependencies<ServerStartDependencies>(
        defaultServerStartDependencies,
        dependencies
    );

    let httpServer: http.Server | null = null;
    try {
        const serverConfig = await deps.createServerConfig(options, context);

        // サーバー起動処理
        httpServer = await deps.createHttpServer(serverConfig.port, serverConfig.host, context);

        deps.setupSignalStop(serverConfig.signalClose, context);

        // config の port 実際の httpServer のに書き換える。
        deps.updatePort(serverConfig, httpServer, context);

        await deps.serverPostStartup(serverConfig, context);

        return httpServer;
    } catch (error) {
        return deps.startCatchError(error, httpServer, context);
    }
}
