import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration api", () => {
    it("supports route parameters, explicit statuses, and method errors", async () => {
        const fixtureUrl = new URL("../fixtures/api/route-params-and-status.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("GETができる", async () => {
        const fixtureUrl = new URL("../fixtures/api/access-api-get.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("POSTができる", async () => {
        const fixtureUrl = new URL("../fixtures/api/access-api-post.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("複数のAPIが呼び出せる", async () => {
        const fixtureUrl = new URL("../fixtures/api/access-api-multiple.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("APIを上書きできる", async () => {
        const fixtureUrl = new URL("../fixtures/api/api-overwrite.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("APIがない場合、エラーのレスポンスを送れる", async () => {
        const fixtureUrl = new URL("../fixtures/api/non-api-response.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("APIハンドラーが例外が発生した場合、エラーのレスポンスを送れる", async () => {
        const fixtureUrl = new URL(
            "../fixtures/api/error-api-handler-response.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
