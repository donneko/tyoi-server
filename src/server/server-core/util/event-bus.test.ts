import { describe, expect, it, vi } from "vitest";
import { EventBus } from "./event-bus.js";

describe("EventBus", () => {
    it("同期ハンドラーの例外があっても後続ハンドラーを実行する", async () => {
        const eventBus = new EventBus<{ event: unknown }>();
        const error = new Error("handler failed");
        const failedHandler = vi.fn(() => {
            throw error;
        });
        const followingHandler = vi.fn();

        eventBus.on("event", failedHandler);
        eventBus.on("event", followingHandler);

        await expect(eventBus.emit("event", {})).rejects.toBe(error);
        expect(followingHandler).toHaveBeenCalledOnce();
    });
});
