import type { ServerStartCatchErrorContext } from "../../../types/context/start-server/start-server.type.js";
import { CustomError } from "../../../error/custom-error.js";
import type http from "node:http";

export function startCatchError(
    error: unknown,
    httpServer: http.Server | null,
    context: ServerStartCatchErrorContext
): http.Server {
    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;
    const innerEventBus = context.innerEventBus;

    serverLogger.logger("error", messageManager.message("server.start.failed"));

    if (error instanceof Error) {
        serverLogger.logger("error", error.message);
        innerEventBus.emit("server/start:error", { error });
    } else {
        innerEventBus.emit("server/start:error", {});
    }

    const ERROR_LOW = ["SUMMARY_ERROR", "BROWSER_OPEN_ERROR"];

    if (
        error instanceof CustomError &&
        ERROR_LOW.includes(error.errorName ?? "") &&
        httpServer !== null
    ) {
        return httpServer;
    }

    httpServer?.close();
    throw error;
}
