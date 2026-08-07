import { describe, expect, it, vi } from "vitest";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import { updatePort } from "./update-port.js";

function createConfig(): ServerStartUseConfig {
    return {
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
}

describe("updatePort", () => {
    it("サーバーが実際に使用しているポートへ設定を書き換える", () => {
        const config = createConfig();
        const updateConfig = vi.fn();
        const httpServer = { address: vi.fn(() => ({ port: 4321 })) };

        updatePort(config, httpServer as never, {
            serverConfig: { updateConfig } as never,
        });

        expect(config.port).toBe(4321);
        expect(updateConfig).toHaveBeenCalledWith({ port: 4321 });
    });

    it.each([null, "socket"])("ポートを取得できない場合は設定値を維持する", (address) => {
        const config = createConfig();
        const updateConfig = vi.fn();

        updatePort({ ...config }, { address: () => address } as never, {
            serverConfig: { updateConfig } as never,
        });

        expect(updateConfig).toHaveBeenCalledWith({ port: 3000 });
    });
});
