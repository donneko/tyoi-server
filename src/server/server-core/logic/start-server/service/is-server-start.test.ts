import http from "node:http";
import { describe, expect, it } from "vitest";
import { isServerStart } from "./is-server-start.js";

describe("isServerStart", () => {
    it("サーバーがなく起動中でもない場合だけ true を返す", () => {
        expect(isServerStart(null, false)).toBe(true);
        expect(isServerStart(undefined, false)).toBe(true);
        expect(isServerStart(null, true)).toBe(false);
    });

    it("HTTP サーバーが存在する場合は false を返す", () => {
        const server = http.createServer();

        expect(isServerStart(server, false)).toBe(false);
        expect(isServerStart(server, true)).toBe(false);
    });
});
