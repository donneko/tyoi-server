import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/async-run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration lifecycle", () => {
    it("エラーが起きずに、スタートしてストップできる", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ポートにアクセスできる", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("起動中にisRunningがtrue", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/started-is-running.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("起動中にgetHttpServerからhttpサーバーを取得できる", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/started-get-http.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("終了したらisRunningがfalse", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/stopped-is-running.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("終了したらgetHttpServerからhttpサーバーを取得できない", async () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-not-get-http.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("Signalハンドラーが終了じに回収されている", async () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-signal-handler.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("10回再起動を繰り返してもSignalハンドラーが終了じに回収されている", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/loop-signal-handler.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("start を二回実行しても、二回めを無視する(例外が発生しない)", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/skip-started-start.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("サーバーが起動していないときに stop を実行しても、無視する(例外が発生しない)", async () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/skip-stopped-stop.ts", import.meta.url);
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバー終了後にhttpでアクセスできない", async () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-not-access-port.ts",
            import.meta.url
        );
        const result = await runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
