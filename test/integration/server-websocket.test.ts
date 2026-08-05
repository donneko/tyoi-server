import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration websocket", () => {
    it("クライアントで接続ができる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーで接続を確認できる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("クライアントからサーバーにデータを送れる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーからクライアントにデータを送れる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーの終了でクライアントがcloseを受け取る", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("クライアントの終了でサーバーがcloseを受け取る", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("複数のハンドラーを登録できる", () => {
        const fixtureUrl = new URL("../fixtures/api/access-api-multiple.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラーを上書きできる", () => {
        const fixtureUrl = new URL("../fixtures/api/api-overwrite.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラーがない場合、エラーのレスポンスを送れる", () => {
        const fixtureUrl = new URL("../fixtures/api/non-api-response.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラー内で例外が発生した場合、エラーのレスポンスを送れる", () => {
        const fixtureUrl = new URL(
            "../fixtures/api/error-api-handler-response.ts",
            import.meta.url
        );
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
