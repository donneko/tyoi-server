import { describe, expect, it } from "vitest";
import { runTestProcess } from "../helper/run-test-process.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";

describe("Server integration lifecycle", () => {
    it("エラーが起きずに、スタートしてストップできる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/start-then-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("ポートにアクセスできる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("起動中にisRunningがtrue", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/started-is-running.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("起動中にgetHttpServerからhttpサーバーを取得できる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/started-get-http.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("終了したらisRunningがfalse", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/stopped-is-running.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("終了したらgetHttpServerからhttpサーバーを取得できない", () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-not-get-http.ts",
            import.meta.url
        );
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("Signalハンドラーが終了じに回収されている", () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-signal-handler.ts",
            import.meta.url
        );
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("10回再起動を繰り返してもSignalハンドラーが終了じに回収されている", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/loop-signal-handler.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("start を二回実行しても、二回めを無視する(例外が発生しない)", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/skip-started-start.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("サーバーが起動していないときに stop を実行しても、無視する(例外が発生しない)", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/skip-stopped-stop.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバー終了後にhttpでアクセスできない", () => {
        const fixtureUrl = new URL(
            "../fixtures/lifecycle/stopped-not-access-port.ts",
            import.meta.url
        );
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
