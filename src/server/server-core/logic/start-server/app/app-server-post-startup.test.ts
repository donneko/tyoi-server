import { describe, expect, it, vi } from "vitest";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import { serverPostStartup } from "./app-server-post-startup.js";

const config: ServerStartUseConfig = {
    port: 3000,
    exposeLan: false,
    showQrCode: false,
    publicPath: "public",
    publicFullPath: "/project/public",
    openBrowser: "local",
    apiPrefix: "/api",
    host: "127.0.0.1",
    signalShutdownHandling: true,
};

describe("serverPostStartup", () => {
    it("サマリーを表示してからブラウザを開く", async () => {
        const calls: string[] = [];
        const serverSummary = vi.fn(() => calls.push("summary"));
        const serverOpenBrowser = vi.fn(async () => {
            calls.push("browser");
        });
        const context = {};

        await serverPostStartup(config, context as never, {
            serverSummary,
            serverOpenBrowser,
        });

        expect(calls).toEqual(["summary", "browser"]);
        expect(serverSummary).toHaveBeenCalledWith(config, context);
        expect(serverOpenBrowser).toHaveBeenCalledWith({ ...config, target: "local" }, context);
    });

    it("サマリー生成エラーを SUMMARY_ERROR に変換する", async () => {
        const cause = new Error("summary failed");

        await expect(
            serverPostStartup(config, {} as never, {
                serverSummary: vi.fn(() => {
                    throw cause;
                }),
                serverOpenBrowser: vi.fn(),
            })
        ).rejects.toMatchObject({
            message: "サーバーサマリー生成ができませんでした",
            errorName: "SUMMARY_ERROR",
            cause,
        });
    });

    it("ブラウザ起動エラーを BROWSER_OPEN_ERROR に変換する", async () => {
        const cause = new Error("browser failed");

        await expect(
            serverPostStartup(config, {} as never, {
                serverSummary: vi.fn(),
                serverOpenBrowser: vi.fn(async () => {
                    throw cause;
                }),
            })
        ).rejects.toMatchObject({
            message: "ブラウザを開けませんでした",
            errorName: "BROWSER_OPEN_ERROR",
            cause,
        });
    });
});
