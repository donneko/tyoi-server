import { describe, expect, it, vi } from "vitest";
import { setupExpress } from "./app-setup-express.js";

describe("setupExpress", () => {
    it("設定に従って Express の各機能をセットアップする", () => {
        const context = {};
        const expressConfig = {
            middlewares: [vi.fn()],
            apiPrefix: "/api",
            publicDirectoryPath: "/project/public",
        };
        const dependencies = {
            createExpressConfig: vi.fn(() => expressConfig),
            setupMiddleware: vi.fn(),
            setupDefaultMiddleware: vi.fn(),
            setupApiProcess: vi.fn(),
            setupStaticFile: vi.fn(),
        };

        setupExpress(context as never, dependencies);

        expect(dependencies.createExpressConfig).toHaveBeenCalledWith(context);
        expect(dependencies.setupMiddleware).toHaveBeenCalledWith(
            expressConfig.middlewares,
            context
        );
        expect(dependencies.setupDefaultMiddleware).toHaveBeenCalledWith(context);
        expect(dependencies.setupApiProcess).toHaveBeenCalledWith("/api", context);
        expect(dependencies.setupStaticFile).toHaveBeenCalledWith("/project/public", context);
        expect(dependencies.setupMiddleware.mock.invocationCallOrder[0]).toBeLessThan(
            dependencies.setupStaticFile.mock.invocationCallOrder[0] ?? 0
        );
    });
});
