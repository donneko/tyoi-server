import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration config", () => {
    it("サーバー作成時に、デフォルトの設定を上書きできる", async () => {
        const fixtureUrl = new URL(
            "../fixtures/config/create-server-config-overwrite.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバー起動時に、設定を上書きできる", async () => {
        const fixtureUrl = new URL(
            "../fixtures/config/start-server-config-overwrite.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
