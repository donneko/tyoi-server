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
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("起動中にisRunningがtrueでgetHttpServerからhttpサーバーを取得できる", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("終了したらにisRunningがfalseでgetHttpServerからhttpサーバーを取得できない", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("Signalハンドラーが終了じに回収されている", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("10回再起動を繰り返してもSignalハンドラーが終了じに回収されている", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });

    it("start を二回実行しても、二回めを無視する", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバー起動中に stop を二回実行しても、二回めを無視する", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバーが起動していないときに stop を実行しても、無視する", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("サーバー終了後にhttpでアクセスできない", () => {
        const fixtureUrl = new URL("../fixtures/lifecycle/access-port.ts", import.meta.url);
        const result = runTestProcess(fixtureUrl);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
