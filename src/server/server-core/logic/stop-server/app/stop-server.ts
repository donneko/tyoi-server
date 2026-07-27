import type http from "node:http";
import type { ServerStopServerDependencies } from "../../../types/server-dependencies.type.js";
import { createFinish } from "../service/create-finish.js";
import { offSignalStop } from "../service/off-signal-stop.js";

export async function stopServer(
    httpServer: http.Server,
    dependencies: ServerStopServerDependencies
): Promise<void> {
    await dependencies.webSocketRouter.close();

    return new Promise<void>((resolve, reject) => {
        const serverLogger = dependencies.serverLogger;
        const systemMetaManager = dependencies.systemMetaManager;
        const getMessage = (code: Parameters<typeof systemMetaManager.getMeta>[0]) =>
            systemMetaManager.getMeta(code).message;

        // !! オブジェクトを展開しないで！！ settled の参照が切れる。
        const finishObj = createFinish(httpServer, resolve, dependencies);

        serverLogger.logger("process", getMessage(104));
        offSignalStop(dependencies);

        httpServer.close((error) => {
            // ログが二重に出力されないようにするために、必要
            if (finishObj.settled) return;

            if (error) {
                serverLogger.logger("error", getMessage(106));

                finishObj.finish();
                reject(error);
                return;
            }
            serverLogger.logger("success", getMessage(107));

            finishObj.finish();
            resolve();
        });

        httpServer.closeIdleConnections();
    });
}
