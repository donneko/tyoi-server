import { describe, expect, it, vi } from "vitest";
import { CustomError } from "../../../error/custom-error.js";
import { startCatchError } from "./start-catch-error.js";

function createContext() {
    return {
        serverLogger: { logger: vi.fn() },
        messageManager: {
            message: vi.fn(() => "サーバー起動エラー"),
        },
        innerEventBus: { emit: vi.fn() },
    };
}

describe("startCatchError", () => {
    it.each(["SUMMARY_ERROR", "BROWSER_OPEN_ERROR"])(
        "%s は起動済みサーバーを維持して返す",
        (errorName) => {
            const context = createContext();
            const httpServer = { close: vi.fn() };
            const error = new CustomError("optional startup action failed", { errorName });

            expect(startCatchError(error, httpServer as never, context as never)).toBe(httpServer);
            expect(httpServer.close).not.toHaveBeenCalled();
            expect(context.innerEventBus.emit).toHaveBeenCalledWith("server/start:error", {
                error,
            });
        }
    );

    it("通常の Error はログとイベントに記録し、サーバーを閉じて再送出する", () => {
        const context = createContext();
        const httpServer = { close: vi.fn() };
        const error = new Error("listen failed");

        expect(() => startCatchError(error, httpServer as never, context as never)).toThrow(error);
        expect(context.serverLogger.logger).toHaveBeenNthCalledWith(
            1,
            "error",
            "サーバー起動エラー"
        );
        expect(context.serverLogger.logger).toHaveBeenNthCalledWith(2, "error", "listen failed");
        expect(context.innerEventBus.emit).toHaveBeenCalledWith("server/start:error", {
            error,
        });
        expect(httpServer.close).toHaveBeenCalledOnce();
    });

    it("Error 以外はエラー本体なしでイベントを発火し、値を再送出する", () => {
        const context = createContext();

        expect(() => startCatchError("failure", null, context as never)).toThrow("failure");
        expect(context.innerEventBus.emit).toHaveBeenCalledWith("server/start:error", {});
        expect(context.serverLogger.logger).toHaveBeenCalledTimes(1);
    });

    it("軽微なエラーでもサーバー未生成なら再送出する", () => {
        const error = new CustomError("summary failed", {
            errorName: "SUMMARY_ERROR",
        });

        expect(() => startCatchError(error, null, createContext() as never)).toThrow(error);
    });
});
