import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createFinish } from "./create-finish.js";

function createContext() {
    return {
        serverLogger: { logger: vi.fn() },
        messageManager: {
            message: vi.fn(() => "強制的に接続を終了しました"),
        },
    };
}

describe("createFinish", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("finish を呼ぶと完了状態になりタイムアウトを解除する", () => {
        const httpServer = { closeAllConnections: vi.fn() };
        const resolve = vi.fn();
        const context = createContext();
        const finishObj = createFinish(httpServer as never, resolve, context as never);

        finishObj.finish();
        finishObj.finish();
        vi.advanceTimersByTime(10_000);

        expect(finishObj.settled).toBe(true);
        expect(httpServer.closeAllConnections).not.toHaveBeenCalled();
        expect(resolve).not.toHaveBeenCalled();
        expect(context.serverLogger.logger).not.toHaveBeenCalled();
    });

    it("10秒経過時に全接続を閉じて停止処理を完了する", () => {
        const httpServer = { closeAllConnections: vi.fn() };
        const resolve = vi.fn();
        const context = createContext();
        const finishObj = createFinish(httpServer as never, resolve, context as never);

        vi.advanceTimersByTime(9_999);
        expect(httpServer.closeAllConnections).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);

        expect(httpServer.closeAllConnections).toHaveBeenCalledOnce();
        expect(context.serverLogger.logger).toHaveBeenCalledWith(
            "warn",
            "強制的に接続を終了しました"
        );
        expect(resolve).toHaveBeenCalledOnce();
        expect(finishObj.settled).toBe(true);
    });
});
