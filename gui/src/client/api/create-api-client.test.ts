import { describe, expect, it, vi } from "vitest";
import { createApiClient } from "./create-api-client";

describe("createApiClient", () => {
    it("uses the injected fetch and same-origin base URL", async () => {
        const fetch = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({
                    state: "running",
                    port: 3000,
                    uptimeSeconds: 1,
                    lastUpdated: "now",
                }),
                { status: 200 }
            )
        );
        const api = createApiClient({
            fetch: fetch as unknown as typeof globalThis.fetch,
            baseUrl: "/__tyoi/api",
        });

        await expect(api.getStatus()).resolves.toMatchObject({ state: "running", port: 3000 });
        expect(fetch).toHaveBeenCalledWith("/__tyoi/api/status");
    });

    it("rejects unsuccessful responses", async () => {
        const api = createApiClient({
            fetch: vi.fn().mockResolvedValue(new Response(null, { status: 403 })) as never,
            baseUrl: "/__tyoi/api",
        });
        await expect(api.getSummary()).rejects.toThrow("API request failed: 403");
    });
});
