import { describe, expect, it, vi } from "vitest";
import { ServerLogger } from "./server-logger.js";

describe("ServerLogger", () => {
    it("イベント通知の失敗を未処理Promiseにしない", async () => {
        const innerCatch = vi.fn();
        const outerCatch = vi.fn();
        const innerEventBus = {
            emit: vi.fn(() => ({ catch: innerCatch })),
        };
        const outEventBus = {
            emit: vi.fn(() => ({ catch: outerCatch })),
        };
        const logger = new ServerLogger(innerEventBus as never, outEventBus as never);

        logger.logger("info", "message");

        expect(innerCatch).toHaveBeenCalledOnce();
        expect(outerCatch).toHaveBeenCalledOnce();
        expect(innerCatch).toHaveBeenCalledWith(expect.any(Function));
        expect(outerCatch).toHaveBeenCalledWith(expect.any(Function));
    });
});
