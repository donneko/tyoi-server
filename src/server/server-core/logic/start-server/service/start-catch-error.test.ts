import { describe, expect, it, vi } from "vitest";
import { CustomError } from "../../../error/custom-error.js";
import { startCatchError } from "./start-catch-error.js";

function createContext() {
    return {
        serverLogger: { logger: vi.fn() },
        messageManager: {
            message: vi.fn(() => "server startup error"),
        },
        innerEventBus: { emit: vi.fn() },
        webSocketRouter: { close: vi.fn(async () => undefined) },
        stopHandler: vi.fn(),
    };
}

describe("startCatchError", () => {
    it.each(["SUMMARY_ERROR", "BROWSER_OPEN_ERROR"])(
        "keeps a started server for %s",
        async (errorName) => {
            const context = createContext();
            const httpServer = { close: vi.fn() };
            const error = new CustomError("optional startup action failed", { errorName });

            await expect(
                startCatchError(error, httpServer as never, context as never)
            ).resolves.toBe(httpServer);
            expect(httpServer.close).not.toHaveBeenCalled();
            expect(context.webSocketRouter.close).not.toHaveBeenCalled();
        }
    );

    it("cleans up WebSocket and HTTP resources for a normal error", async () => {
        const context = createContext();
        const httpServer = { close: vi.fn() };
        const error = new Error("listen failed");
        const processOff = vi.spyOn(process, "off");

        try {
            await expect(
                startCatchError(error, httpServer as never, context as never)
            ).rejects.toThrow(error);
            expect(processOff).toHaveBeenCalledWith("SIGINT", context.stopHandler);
            expect(processOff).toHaveBeenCalledWith("SIGTERM", context.stopHandler);
            expect(context.serverLogger.logger).toHaveBeenNthCalledWith(
                1,
                "error",
                "server startup error"
            );
            expect(context.serverLogger.logger).toHaveBeenNthCalledWith(
                2,
                "error",
                "listen failed"
            );
            expect(context.innerEventBus.emit).toHaveBeenCalledWith("server/start:error", {
                error,
            });
            expect(context.webSocketRouter.close).toHaveBeenCalledOnce();
            expect(httpServer.close).toHaveBeenCalledOnce();
        } finally {
            processOff.mockRestore();
        }
    });

    it("rethrows non-Error values", async () => {
        const context = createContext();

        await expect(startCatchError("failure", null, context as never)).rejects.toBe("failure");
        expect(context.innerEventBus.emit).toHaveBeenCalledWith("server/start:error", {});
        expect(context.serverLogger.logger).toHaveBeenCalledOnce();
    });

    it("rethrows a low-severity error when no server exists", async () => {
        const error = new CustomError("summary failed", {
            errorName: "SUMMARY_ERROR",
        });

        await expect(startCatchError(error, null, createContext() as never)).rejects.toThrow(error);
    });
});
