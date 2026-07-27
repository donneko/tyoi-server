import { describe, expect, it, vi } from "vitest";
import { createServerConfig } from "./create-server-config.js";

describe("createServerConfig", () => {
    it("設定マネージャーからセットアップ用設定を作る", () => {
        const config = {
            baseDirname: "/project",
            publicDirname: "public",
            signalShutdownHandling: true,
        };
        const getConfig = vi.fn((key: keyof typeof config) => config[key]);

        expect(
            createServerConfig({
                serverConfig: { getConfig } as never,
            })
        ).toEqual(config);
    });

    it.each(["", undefined])("baseDirname が %j の場合はエラーにする", (baseDirname) => {
        const config = {
            baseDirname,
            publicDirname: "public",
            signalShutdownHandling: true,
        };

        expect(() =>
            createServerConfig({
                serverConfig: {
                    getConfig: vi.fn((key: keyof typeof config) => config[key]),
                } as never,
            })
        ).toThrow("baseDirname is required");
    });
});
