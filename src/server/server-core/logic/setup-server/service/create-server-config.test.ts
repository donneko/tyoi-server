import { describe, expect, it, vi } from "vitest";
import { createServerConfig } from "./create-server-config.js";

describe("createServerConfig", () => {
    it("設定マネージャーからセットアップ用設定を作る", () => {
        const config = {
            root: "/project",
            public: "public",
            signalClose: true,
        };
        const getConfig = vi.fn((key: keyof typeof config) => config[key]);

        expect(
            createServerConfig({
                serverConfig: { getConfig } as never,
            })
        ).toEqual(config);
    });

    it.each(["", undefined])("root が %j の場合はエラーにする", (root) => {
        const config = {
            root,
            public: "public",
            signalClose: true,
        };

        expect(() =>
            createServerConfig({
                serverConfig: {
                    getConfig: vi.fn((key: keyof typeof config) => config[key]),
                } as never,
            })
        ).toThrow("root is required");
    });
});
