import { describe, expect, it, vi } from "vitest";
import { setupDefaultMiddleware } from "./setup-default-middleware.js";

describe("setupDefaultMiddleware", () => {
    it("JSON パーサーを Express に登録する", () => {
        const use = vi.fn();

        setupDefaultMiddleware({ expressServer: { use } as never });

        expect(use).toHaveBeenCalledOnce();
        expect(use).toHaveBeenCalledWith(expect.any(Function));
    });
});
