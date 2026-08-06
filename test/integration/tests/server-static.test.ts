import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration static", () => {
    it("ページを配信できる", async () => {
        const fixtureUrl = new URL("../fixtures/static/stream-static.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ページが存在しない場合に 404 ページを返せる", async () => {
        const fixtureUrl = new URL("../fixtures/static/static-not-found.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
