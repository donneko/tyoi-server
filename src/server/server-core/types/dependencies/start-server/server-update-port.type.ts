import type { UpdatePortContext } from "../../context/integration/server-context.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import type http from "node:http";

export type ServerUpdatePort = (
    config: ServerStartUseConfig,
    httpServer: http.Server,
    context: UpdatePortContext
) => void;
