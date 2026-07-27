import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { createHttpServer } from "./app-create-http-server.js";

class FakeServer extends EventEmitter {
    listen = vi.fn(() => this);
}

describe("createHttpServer", () => {
    it("WebSocket を開始して listening イベント後にサーバーを返す", async () => {
        const server = new FakeServer();
        const context = {
            expressServer: vi.fn(),
            webSocketRouter: { start: vi.fn() },
        };
        const promise = createHttpServer(3000, "127.0.0.1", context as never, {
            createServer: vi.fn(() => server) as never,
        });

        expect(context.webSocketRouter.start).toHaveBeenCalledWith(server);
        expect(server.listen).toHaveBeenCalledWith(3000, "127.0.0.1");

        server.emit("listening");

        await expect(promise).resolves.toBe(server);
        expect(server.listenerCount("error")).toBe(0);
    });

    it("error イベントを受け取った場合は起動失敗にする", async () => {
        const server = new FakeServer();
        const error = new Error("listen failed");
        const promise = createHttpServer(
            3000,
            "127.0.0.1",
            {
                expressServer: vi.fn(),
                webSocketRouter: { start: vi.fn() },
            } as never,
            { createServer: vi.fn(() => server) as never }
        );

        server.emit("error", error);

        await expect(promise).rejects.toBe(error);
        expect(server.listenerCount("listening")).toBe(0);
    });
});
