import type { ServerStartCatchErrorContext } from "../../context/integration/server-context.type.js";
import type http from "node:http";

export type ServerStartCatchError = (
    error: unknown,
    httpServer: http.Server | null,
    context: ServerStartCatchErrorContext
) => void;
