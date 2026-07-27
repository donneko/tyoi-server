import { describe, expect, it, vi } from "vitest";
import { setupMiddleware } from "./setup-middleware.js";

describe("setupMiddleware", () => {
    it("指定された順番で全ミドルウェアを登録する", () => {
        const use = vi.fn();
        const middlewares = [vi.fn(), vi.fn(), vi.fn()];

        setupMiddleware(middlewares, {
            expressServer: { use } as never,
        });

        expect(use.mock.calls).toEqual(middlewares.map((middleware) => [middleware]));
    });

    it("空配列なら何も登録しない", () => {
        const use = vi.fn();

        setupMiddleware([], { expressServer: { use } as never });

        expect(use).not.toHaveBeenCalled();
    });
});
