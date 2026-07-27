import type { ServerStartCatchErrorDependencies } from "../../../types/server-dependencies.type.js";
import { CustomError } from "../../../error/custom-error.js";
import type http from "node:http";

export function startCatchError(
    error: unknown,
    httpServer: http.Server | null,
    dependencies: ServerStartCatchErrorDependencies
) {
    const serverLogger = dependencies.serverLogger;
    const systemMetaManager = dependencies.systemMetaManager;
    const innerEventBus = dependencies.innerEventBus;

    serverLogger.logger("error", systemMetaManager.getMeta(103).message);

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
