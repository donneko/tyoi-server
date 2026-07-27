import { describe, expect, it, vi } from "vitest";
import { setupStaticFile } from "./app-setup-static.js";

describe("setupStaticFile", () => {
    it("静的配信と404フォールバックを順番に登録する", () => {
        const use = vi.fn();
        const getMeta = vi.fn(() => ({
            code: 404,
            message: "Not Found",
            description: "Resource was not found",
        }));

        setupStaticFile("/project/public", {
            expressServer: { use } as never,
            httpMetaManager: { getMeta } as never,
        });

        expect(use).toHaveBeenCalledTimes(2);
        expect(use.mock.calls[0]?.[0]).toEqual(expect.any(Function));

        const fallback = use.mock.calls[1]?.[0] as
            ((request: unknown, response: unknown) => void) | undefined;
        const response = {
            status: vi.fn(),
            send: vi.fn(),
        };
        response.status.mockReturnValue(response);
        fallback?.({}, response);

        expect(getMeta).toHaveBeenCalledWith(404);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.send).toHaveBeenCalledWith(
            "<h1>Not Found</h1><br><p>Resource was not found</p>"
        );
    });
});
