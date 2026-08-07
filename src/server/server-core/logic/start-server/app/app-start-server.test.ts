import { describe, expect, it, vi } from "vitest";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import { startServer } from "./app-start-server.js";

const config: ServerStartUseConfig = {
    port: 3000,
    lan: false,
    qr: false,
    publicPath: "public",
    publicFullPath: "/project/public",
    browser: false,
    api: "/api",
    host: "127.0.0.1",
    signalClose: true,
};

function createDependencies() {
    const httpServer = { close: vi.fn() };
    return {
        httpServer,
        dependencies: {
            createServerConfig: vi.fn(async () => config),
            createHttpServer: vi.fn(async () => httpServer),
            setupSignalStop: vi.fn(),
            updatePort: vi.fn(),
            serverPostStartup: vi.fn(),
            startCatchError: vi.fn(),
        },
    };
}

describe("startServer", () => {
    it("起動処理を順番に実行して HTTP サーバーを返す", async () => {
        const { httpServer, dependencies } = createDependencies();
        const context = {};
        const options = { port: 4000 };

        await expect(startServer(options, context as never, dependencies as never)).resolves.toBe(
            httpServer
        );

        expect(dependencies.createServerConfig).toHaveBeenCalledWith(options, context);
        expect(dependencies.createHttpServer).toHaveBeenCalledWith(3000, "127.0.0.1", context);
        expect(dependencies.setupSignalStop).toHaveBeenCalledWith(true, context);
        expect(dependencies.updatePort).toHaveBeenCalledWith(config, httpServer, context);
        expect(dependencies.serverPostStartup).toHaveBeenCalledWith(config, context);
        expect(dependencies.startCatchError).not.toHaveBeenCalled();
        expect(dependencies.createHttpServer.mock.invocationCallOrder[0]).toBeLessThan(
            dependencies.serverPostStartup.mock.invocationCallOrder[0] ?? 0
        );
    });

    it("HTTP サーバー生成前の失敗を httpServer=null でエラー処理へ渡す", async () => {
        const { dependencies } = createDependencies();
        const error = new Error("config failed");
        const fallbackServer = { close: vi.fn() };
        dependencies.createServerConfig.mockRejectedValueOnce(error);
        dependencies.startCatchError.mockReturnValueOnce(fallbackServer);
        const context = {};

        await expect(startServer({}, context as never, dependencies as never)).resolves.toBe(
            fallbackServer
        );
        expect(dependencies.startCatchError).toHaveBeenCalledWith(error, null, context);
    });

    it("起動後の失敗を生成済み HTTP サーバーと共にエラー処理へ渡す", async () => {
        const { httpServer, dependencies } = createDependencies();
        const error = new Error("post startup failed");
        dependencies.serverPostStartup.mockRejectedValueOnce(error);
        dependencies.startCatchError.mockReturnValueOnce(httpServer);
        const context = {};

        await expect(startServer({}, context as never, dependencies as never)).resolves.toBe(
            httpServer
        );
        expect(dependencies.startCatchError).toHaveBeenCalledWith(error, httpServer, context);
    });
});
