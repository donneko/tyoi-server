import type { ServerStartCatchErrorContext } from "../../context/start-server/start-server.type.js";
import type http from "node:http";

export type ServerStartCatchError = (
    error: unknown,
    httpServer: http.Server | null,
    context: ServerStartCatchErrorContext
) => Promise<http.Server>;
