import type http from "node:http";
import type { CreateFinishContext } from "../../../types/context/stop-server/stop-server.type.js";

export function createFinish(
    httpServer: http.Server,
    resolve: () => void,
    context: CreateFinishContext
) {
    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;

    const finish = () => {
        if (finishObj.settled) return;
        finishObj.settled = true;

        clearTimeout(timeout);
    };

    const timeout = setTimeout(() => {
        if (finishObj.settled) return;

        httpServer.closeAllConnections();
        serverLogger.logger("warn", messageManager.message("server.stop.timeout"));

        finish();
        resolve();
    }, 10000);

    // オブジェクト内に settled を定義すると timeout と finish などに共有できる
    const finishObj = { finish, settled: false };

    return finishObj;
}
