import { ServerUpdatePortDependencies } from "../../../types/server-dependencies.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";

import http from "node:http";

export function updatePort(
    config: ServerStartUseConfig,
    httpServer: http.Server,
    dependencies: ServerUpdatePortDependencies
) {
    const address = httpServer.address();
    const newPort = typeof address === "object" && address !== null ? address.port : config.port;
    config.port = newPort;

    dependencies.serverConfig.updateConfig({ port: newPort });
}
