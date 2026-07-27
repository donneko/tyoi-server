import type http from "node:http";
import type { CreateFinishContext } from "../../../types/context/stop-server/stop-server.type.js";

export function createFinish(
    httpServer: http.Server,
    resolve: () => void,
    context: CreateFinishContext
) {
    const serverLogger = context.serverLogger;
    const systemMetaManager = context.systemMetaManager;
    const getMessage = (code: Parameters<typeof systemMetaManager.getMeta>[0]) =>
        systemMetaManager.getMeta(code).message;

    const finish = () => {
        if (finishObj.settled) return;
        finishObj.settled = true;

        clearTimeout(timeout);
    };

    const timeout = setTimeout(() => {
        if (finishObj.settled) return;

        httpServer.closeAllConnections();
        serverLogger.logger("warn", getMessage(105));

        finish();
        resolve();
    }, 10000);

    // オブジェクト内に settled を定義すると timeout と finish などに共有できる
    const finishObj = { finish, settled: false };

    return finishObj;
}
