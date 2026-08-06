import { describe, expect, it, vi } from "vitest";
import { defineConfig } from "./define-config.js";

describe("defineConfig", () => {
    it.each([-1, 65536, 3000.5])("無効なポート番号 %s を受け入れない", (port) => {
        expect(() => defineConfig({ port })).toThrow();
    });

    it("ポート番号 0 を受け入れる", () => {
        expect(defineConfig({ port: 0 }).port).toBe(0);
    });

    it("不正な middleware を設定として受け入れない", () => {
        expect(() =>
            defineConfig({
                middlewares: [null as never],
            })
        ).toThrow();
    });

    it("関数の middleware は受け入れる", () => {
        const middleware = vi.fn();

        expect(defineConfig({ middlewares: [middleware] }).middlewares).toEqual([middleware]);
    });
});
