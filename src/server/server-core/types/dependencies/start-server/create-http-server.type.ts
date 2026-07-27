import type { ServerCreateHttpServerContext } from "../../context/start-server/start-server.type.js";
import type http from "node:http";

export type ServerCreateHttpServer = (
    port: number,
    host: string,
    context: ServerCreateHttpServerContext,
    dependencies?: Partial<ServerCreateHttpServerDependencies>
) => Promise<http.Server>;

export type ServerCreateHttpServerDependencies = {
    createServer: typeof http.createServer;
};
