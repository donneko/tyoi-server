import { describe, expect, it } from "vitest";
import { resolvedServerConfigSchema, serverConfigSchema } from "./server-config.type.js";

describe("server config schemas", () => {
    it("validates the v1 user config names", () => {
        const config = {
            root: "/project",
            public: "public",
            api: "/api",
            port: 3000,
            lan: true,
            qr: true,
            browser: "lan" as const,
            autoPort: false,
            signalClose: true,
            language: "ja-JP",
        };

        expect(serverConfigSchema.parse(config)).toEqual(config);
    });

    it("rejects ports outside the valid range", () => {
        expect(() => serverConfigSchema.parse({ port: 65536 })).toThrow();
        expect(() => serverConfigSchema.parse({ port: -1 })).toThrow();
    });

    it("validates the resolved config without duplicate fields", () => {
        const config = {
            public: "public",
            api: "/api",
            port: 3000,
            middlewares: [],
            lan: false,
            qr: false,
            browser: false,
            autoPort: false,
            signalClose: true,
            language: "ja-JP",
        };

        expect(resolvedServerConfigSchema.parse(config)).toEqual(config);
    });
});
