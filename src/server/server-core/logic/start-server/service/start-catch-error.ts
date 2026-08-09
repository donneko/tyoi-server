import type { ServerStartCatchErrorContext } from "../../../types/context/start-server/start-server.type.js";
import { CustomError } from "../../../error/custom-error.js";
import type http from "node:http";
import { offSignalStop } from "../../stop-server/service/off-signal-stop.js";

function reportStartError(
    innerEventBus: ServerStartCatchErrorContext["innerEventBus"],
    error: Error | undefined
): void {
    try {
        const result =
            error === undefined
                ? innerEventBus.emit("server/start:error", {})
                : innerEventBus.emit("server/start:error", { error });
        void Promise.resolve(result).catch(() => undefined);
    } catch {
        // Error reporting must not replace the original startup error.
    }
}

async function closeHttpServer(httpServer: http.Server | null): Promise<void> {
    if (!httpServer) return;

    await new Promise<void>((resolve) => {
        try {
            httpServer.close(() => resolve());
        } catch {
            resolve();
        }
    });
}

export async function startCatchError(
    error: unknown,
    httpServer: http.Server | null,
    context: ServerStartCatchErrorContext
): Promise<http.Server> {
    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;
    const innerEventBus = context.innerEventBus;

    serverLogger.logger("error", messageManager.message("server.start.failed"));

    if (error instanceof Error) {
        serverLogger.logger("error", error.message);
        reportStartError(innerEventBus, error);
    } else {
        reportStartError(innerEventBus, undefined);
    }

    const ERROR_LOW = ["SUMMARY_ERROR", "BROWSER_OPEN_ERROR"];

    if (
        error instanceof CustomError &&
        ERROR_LOW.includes(error.errorName ?? "") &&
        httpServer !== null
    ) {
        return httpServer;
    }

    offSignalStop(context);
    try {
        await context.webSocketRouter.close();
    } finally {
        await closeHttpServer(httpServer);
    }
    throw error;
}
