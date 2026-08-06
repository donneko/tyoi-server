import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration event", () => {
    it("サーバー起動時に log event を取得できる", async () => {
        const fixtureUrl = new URL("../fixtures/event/get-log-event.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
