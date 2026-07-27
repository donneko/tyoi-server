import type { ServerStopDependencies } from "../../../types/dependencies/stop-server/stop-server.type.js";
import type { ServerStopContext } from "../../../types/context/stop-server/stop-server.type.js";
import type http from "node:http";
import { defaultServerStopDependencies } from "../dependencies/server-stop.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function stopServer(
    httpServer: http.Server,
    context: ServerStopContext,
    dependencies: Partial<ServerStopDependencies> = {}
): Promise<void> {
    const deps = createDependencies<ServerStopDependencies>(
        defaultServerStopDependencies,
        dependencies
    );

    let webSocketCloseError: unknown;
    try {
        await context.webSocketRouter.close();
    } catch (error) {
        webSocketCloseError = error;
    }

    return new Promise<void>((resolve, reject) => {
        const serverLogger = context.serverLogger;
        const systemMetaManager = context.systemMetaManager;
        const getMessage = (code: Parameters<typeof systemMetaManager.getMeta>[0]) =>
            systemMetaManager.getMeta(code).message;

        // !! オブジェクトを展開しないで！！ settled の参照が切れる。
        const finishResolve = () => {
            if (webSocketCloseError !== undefined) {
                reject(webSocketCloseError);
                return;
            }
            resolve();
        };
        const finishObj = deps.createFinish(httpServer, finishResolve, context);

        serverLogger.logger("process", getMessage(104));
        deps.offSignalStop(context);

        httpServer.close((error) => {
            // ログが二重に出力されないようにするために、必要
            if (finishObj.settled) return;

            if (error) {
                serverLogger.logger("error", getMessage(106));

                finishObj.finish();
                reject(
                    webSocketCloseError === undefined
                        ? error
                        : new AggregateError(
                              [webSocketCloseError, error],
                              "WebSocket and HTTP server shutdown failed"
                          )
                );
                return;
            }
            serverLogger.logger("success", getMessage(107));

            finishObj.finish();
            finishResolve();
        });

        httpServer.closeIdleConnections();
    });
}
