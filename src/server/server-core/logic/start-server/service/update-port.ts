import { UpdatePortContext } from "../../../types/context/start-server/start-server.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import type http from "node:http";

export function updatePort(
    config: ServerStartUseConfig,
    httpServer: http.Server,
    context: UpdatePortContext
) {
    const address = httpServer.address();
    const newPort = typeof address === "object" && address !== null ? address.port : config.port;
    config.port = newPort;

    context.serverConfig.updateConfig({ port: newPort });
}
