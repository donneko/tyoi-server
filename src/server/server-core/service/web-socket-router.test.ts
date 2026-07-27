import { beforeEach, describe, expect, it, vi } from "vitest";

const wsState = vi.hoisted(() => ({
    client: {
        close: vi.fn(),
    },
    handleUpgrade: vi.fn(),
}));

vi.mock("ws", () => ({
    WebSocketServer: class {
        clients = new Set();

        handleUpgrade(
            request: unknown,
            socket: unknown,
            head: unknown,
            callback: (client: typeof wsState.client) => void
        ) {
            wsState.handleUpgrade(request, socket, head);
            callback(wsState.client);
        }
    },
}));

import { WebSocketRouter } from "./web-socket-router.js";

describe("WebSocketRouter", () => {
    beforeEach(() => {
        wsState.client.close.mockClear();
        wsState.handleUpgrade.mockClear();
    });

    it("WebSocket ハンドラの例外を処理して接続を1011で閉じる", async () => {
        const router = new WebSocketRouter<string>();
        router.on("/boom", () => {
            throw new Error("handler failed");
        });
        let upgradeHandler:
            ((request: unknown, socket: unknown, head: unknown) => void) | undefined;
        const server = {
            on: vi.fn(
                (
                    _event: string,
                    handler: (request: unknown, socket: unknown, head: unknown) => void
                ) => {
                    upgradeHandler = handler;
                }
            ),
        };
        const socket = { destroy: vi.fn() };

        router.start(server as never);
        upgradeHandler?.({ url: "/boom", headers: { host: "localhost" } }, socket, Buffer.alloc(0));

        await vi.waitFor(() => {
            expect(wsState.client.close).toHaveBeenCalledWith(1011, "WebSocket handler failed");
        });
        expect(socket.destroy).not.toHaveBeenCalled();
    });

    it("不正なURLのアップグレード要求はソケットを破棄する", () => {
        const router = new WebSocketRouter<string>();
        let upgradeHandler:
            ((request: unknown, socket: unknown, head: unknown) => void) | undefined;
        const server = {
            on: vi.fn(
                (
                    _event: string,
                    handler: (request: unknown, socket: unknown, head: unknown) => void
                ) => {
                    upgradeHandler = handler;
                }
            ),
        };
        const socket = { destroy: vi.fn() };

        router.start(server as never);
        upgradeHandler?.({ url: "http://[invalid", headers: {} }, socket, Buffer.alloc(0));

        expect(socket.destroy).toHaveBeenCalledOnce();
        expect(wsState.handleUpgrade).not.toHaveBeenCalled();
    });
});
