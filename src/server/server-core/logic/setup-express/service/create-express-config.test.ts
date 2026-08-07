import { describe, expect, it, vi } from "vitest";
import { createExpressConfig } from "./create-express-config.js";

describe("createExpressConfig", () => {
    it("Express のセットアップ設定をコンテキストから作る", () => {
        const middlewares = [vi.fn(), vi.fn()];
        const config = { middlewares, api: "/api" };
        const context = {
            serverConfig: {
                getConfig: vi.fn((key: keyof typeof config) => config[key]),
            },
            serverRegister: {
                getConfig: vi.fn(() => "/project/public"),
            },
        };

        expect(createExpressConfig(context as never)).toEqual({
            middlewares,
            api: "/api",
            publicDirectoryPath: "/project/public",
        });
    });

    it("公開パスが未登録の場合は空文字を使う", () => {
        const config = { middlewares: [], api: "/api" };

        expect(
            createExpressConfig({
                serverConfig: {
                    getConfig: vi.fn((key: keyof typeof config) => config[key]),
                },
                serverRegister: { getConfig: vi.fn(() => undefined) },
            } as never)
        ).toMatchObject({ publicDirectoryPath: "" });
    });
});
