import { describe, expect, it, vi } from "vitest";
import { setupServer } from "./app-setup-server.js";

describe("setupServer", () => {
    it("作成した設定を使って公開パスをセットアップする", () => {
        const context = {};
        const serverConfig = {
            baseDirname: "/project",
            publicDirname: "public",
            signalShutdownHandling: true,
        };
        const createServerConfig = vi.fn(() => serverConfig);
        const setupPublicPath = vi.fn();

        setupServer(context as never, { createServerConfig, setupPublicPath });

        expect(createServerConfig).toHaveBeenCalledWith(context);
        expect(setupPublicPath).toHaveBeenCalledWith("/project", "public", context);
        expect(createServerConfig.mock.invocationCallOrder[0]).toBeLessThan(
            setupPublicPath.mock.invocationCallOrder[0] ?? 0
        );
    });
});
