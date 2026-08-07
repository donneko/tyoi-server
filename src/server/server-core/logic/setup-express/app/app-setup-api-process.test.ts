import { describe, expect, it, vi } from "vitest";
import { setupApiProcess } from "./app-setup-api-process.js";

describe("setupApiProcess", () => {
    it("API prefix にリクエスト処理を登録する", async () => {
        const use = vi.fn();
        const result = Promise.resolve();
        const apiProcess = vi.fn(() => result);
        const context = { expressServer: { use } };

        await setupApiProcess("/api", context as never, { apiProcess });

        expect(use).toHaveBeenCalledWith("/api", expect.any(Function));

        const handler = use.mock.calls[0]?.[1] as
            ((request: unknown, response: unknown) => unknown) | undefined;
        const request = {};
        const response = {};
        const handlerResult = handler?.(request, response);

        expect(apiProcess).toHaveBeenCalledWith(request, response, context);
        expect(handlerResult).toBe(result);
    });
});
