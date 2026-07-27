import type { ServerCreateHttpServerDependencies } from "../../../types/dependencies/start-server/create-http-server.type.js";
import http from "node:http";

export function defaultCreateHttpServerDependencies(): ServerCreateHttpServerDependencies {
    return { createServer: http.createServer };
}
