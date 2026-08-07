import type http from "node:http";
import { beforeEach, describe, expect, it, vi } from "vitest";

const stopMocks = vi.hoisted(() => ({
    isServerStop: vi.fn(() => true),
    stopServer: vi.fn(),
}));

vi.mock("../logic/stop-server/index.js", () => stopMocks);

import { Server } from "./server.js";

describe("Server.stop", () => {
    beforeEach(() => {
        stopMocks.isServerStop.mockClear();
        stopMocks.stopServer.mockReset();
    });

    it("停止失敗後も listen 中の HTTP サーバー参照を維持する", async () => {
        const server = new Server({
            root: process.cwd(),
            public: "public/main",
        });
        const httpServer = { listening: true } as http.Server;
        const error = new Error("shutdown failed");
        (
            server as unknown as {
                httpServer: http.Server | null;
            }
        ).httpServer = httpServer;
        stopMocks.stopServer.mockRejectedValueOnce(error);

        await expect(server.stop()).rejects.toBe(error);

        expect(server.getHttpServer()).toBe(httpServer);
        expect(server.isRunning()).toBe(true);
    });

    it("停止失敗時でも HTTP サーバーが停止済みなら参照を破棄する", async () => {
        const server = new Server({
            root: process.cwd(),
            public: "public/main",
        });
        const httpServer = { listening: false } as http.Server;
        (
            server as unknown as {
                httpServer: http.Server | null;
            }
        ).httpServer = httpServer;
        stopMocks.stopServer.mockRejectedValueOnce(new Error("shutdown failed"));

        await expect(server.stop()).rejects.toThrow("shutdown failed");

        expect(server.getHttpServer()).toBeNull();
        expect(server.isRunning()).toBe(false);
    });
});
