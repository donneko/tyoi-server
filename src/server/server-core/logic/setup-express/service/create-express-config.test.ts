import { describe, expect, it, vi } from "vitest";
import { createExpressConfig } from "./create-express-config.js";

describe("createExpressConfig", () => {
    it("Express のセットアップ設定をコンテキストから作る", () => {
        const middlewares = [vi.fn(), vi.fn()];
        const config = { middlewares, apiPrefix: "/api" };
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
            apiPrefix: "/api",
            publicDirectoryPath: "/project/public",
        });
    });

    it("公開パスが未登録の場合は空文字を使う", () => {
        const config = { middlewares: [], apiPrefix: "/api" };

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
