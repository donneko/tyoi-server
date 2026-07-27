import type { ServerCreateHttpServerDependencies } from "../../../types/dependencies/start-server/create-http-server.type.js";
import type { ServerCreateHttpServerContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultCreateHttpServerDependencies } from "../dependencies/create-http-server.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type http from "node:http";

export async function createHttpServer(
    port: number,
    host: string,
    context: ServerCreateHttpServerContext,
    dependencies: Partial<ServerCreateHttpServerDependencies> = {}
): Promise<http.Server> {
    const deps = createDependencies<ServerCreateHttpServerDependencies>(
        defaultCreateHttpServerDependencies,
        dependencies
    );

    return new Promise<http.Server>((resolve, reject) => {
        const server = deps.createServer(context.expressServer);

        context.webSocketRouter.start(server);

        server.listen(port, host);

        const onError = (error: Error) => {
            server.off("listening", onListening);
            reject(error);
        };

        const onListening = () => {
            server.off("error", onError);
            resolve(server);
        };

        server.once("error", onError);
        server.once("listening", onListening);
    });
}
