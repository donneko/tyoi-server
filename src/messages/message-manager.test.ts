import path from "node:path";
import { describe, expect, it } from "vitest";
import { MessageManager } from "./message-manager.js";

describe("MessageManager", () => {
    it("継承されたプロパティをメッセージ変数として扱わない", () => {
        const messageManager = new MessageManager("en-US", path.resolve("languages"));
        const variables = Object.create({ port: 3000 }) as Record<
            string,
            string | number | boolean
        >;

        expect(() => messageManager.message("server.summary.port", variables)).toThrow(
            "Message variable not found: port"
        );
    });

    it.each(["en-US", "ja-JP"] as const)(
        "uses the v1 api variable in the %s server summary",
        (language) => {
            const messageManager = new MessageManager(language, path.resolve("languages"));

            expect(messageManager.message("server.summary.api", { api: "/api" })).toBe("API: /api");
        }
    );
});
