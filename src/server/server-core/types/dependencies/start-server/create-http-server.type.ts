import type { ServerCreateHttpServerContext } from "../../context/start-server/start-server.type.js";
import type http from "node:http";

export type ServerCreateHttpServer = (
    port: number,
    host: string,
    context: ServerCreateHttpServerContext
) => Promise<http.Server>;
