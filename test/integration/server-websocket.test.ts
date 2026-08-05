import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration websocket", () => {
    it("クライアントで接続ができる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/access-ws-server.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーで接続を確認できる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/access-ws-client.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("クライアントからサーバーにデータを送れる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/send-ws-client.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーからクライアントにデータを送れる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/send-ws-server.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーの終了でクライアントがcloseを受け取る", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/close-ws-server.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("クライアントの終了でサーバーがcloseを受け取る", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/close-ws-client.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("複数のハンドラーを登録できる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/access-ws-multiple.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラーを上書きできる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/ws-overwrite.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラーがない場合、エラーのレスポンスを送れる", async () => {
        const fixtureUrl = new URL("../fixtures/websocket/non-ws-response.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ハンドラー内で例外が発生した場合、エラーのレスポンスを送れる", async () => {
        const fixtureUrl = new URL(
            "../fixtures/websocket/error-ws-handler-response.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
