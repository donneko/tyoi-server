import { describe, expect, it, vi } from "vitest";
import { createServerConfig } from "./create-server-config.js";

describe("createServerConfig", () => {
    it.each([
        { exposeLan: true, expectedHost: "0.0.0.0" },
        { exposeLan: false, expectedHost: "127.0.0.1" },
    ] as const)(
        "設定を更新し、$expectedHost 用の起動設定を作る",
        async ({ exposeLan, expectedHost }) => {
            const config = {
                exposeLan,
                autoPort: true,
                showQrCode: true,
                publicDirname: "public",
                openBrowser: "network",
                apiPrefix: "/api",
                port: 3000,
                signalShutdownHandling: true,
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
                exposeLan,
                showQrCode: true,
                publicPath: "public",
                publicFullPath: "/project/public",
                openBrowser: "network",
                apiPrefix: "/api",
                host: expectedHost,
                signalShutdownHandling: true,
            });
        }
    );

    it("公開ディレクトリの登録がない場合は空文字を使う", async () => {
        const config = {
            exposeLan: false,
            autoPort: false,
            showQrCode: false,
            publicDirname: "public",
            openBrowser: false,
            apiPrefix: "/api",
            port: 3000,
            signalShutdownHandling: false,
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
