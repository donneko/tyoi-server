import http from "node:http";
import { describe, expect, it } from "vitest";
import { isServerStop } from "./is-server-stop.js";

describe("isServerStop", () => {
    it("HTTP サーバーがあり停止中でない場合だけ true を返す", () => {
        const server = http.createServer();

        expect(isServerStop(server, false)).toBe(true);
        expect(isServerStop(server, true)).toBe(false);
        expect(isServerStop(null, false)).toBe(false);
        expect(isServerStop({}, false)).toBe(false);
    });
});
