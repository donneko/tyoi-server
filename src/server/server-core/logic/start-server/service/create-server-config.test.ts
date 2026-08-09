import { describe, expect, it, vi } from "vitest";
import { createServerConfig } from "./create-server-config.js";

describe("createServerConfig", () => {
    it.each([
        { lan: true, expectedHost: "0.0.0.0" },
        { lan: false, expectedHost: "127.0.0.1" },
    ] as const)("設定を更新し、$expectedHost 用の起動設定を作る", async ({ lan, expectedHost }) => {
        const config = {
            lan,
            autoPort: true,
            qr: true,
            public: "public",
            browser: "lan",
            api: "/api",
            port: 3000,
            signalClose: true,
        };
        const updateConfig = vi.fn();
        const getConfig = vi.fn((key: keyof typeof config) => config[key]);
        const findAvailablePort = vi.fn(async () => 3001);
        const context = {
            serverConfig: { updateConfig, getConfig },
            serverRegister: {
                getConfig: vi.fn(() => "/project/public"),
            },
        };

        const result = await createServerConfig({ port: 4000 }, context as never, {
            findAvailablePort,
        });

        expect(updateConfig).toHaveBeenCalledWith({ port: 4000 });
        expect(findAvailablePort).toHaveBeenCalledWith(
            {
                startPort: 3000,
                host: expectedHost,
                isAutoPort: true,
            },
            context
        );
        expect(result).toEqual({
            port: 3001,
            lan,
            qr: true,
            publicPath: "public",
            publicFullPath: "/project/public",
            browser: "lan",
            api: "/api",
            host: expectedHost,
            signalClose: true,
        });
    });

    it("公開ディレクトリの登録がない場合は空文字を使う", async () => {
        const config = {
            lan: false,
            autoPort: false,
            qr: false,
            public: "public",
            browser: false,
            api: "/api",
            port: 3000,
            signalClose: false,
        };
        const context = {
            serverConfig: {
                updateConfig: vi.fn(),
                getConfig: vi.fn((key: keyof typeof config) => config[key]),
            },
            serverRegister: { getConfig: vi.fn(() => undefined) },
        };

        const result = await createServerConfig({}, context as never, {
            findAvailablePort: vi.fn(async () => 3000),
        });

        expect(result.publicFullPath).toBe("");
    });
});
