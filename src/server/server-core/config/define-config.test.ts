import { describe, expect, it, vi } from "vitest";
import { defineConfig } from "./define-config.js";

describe("defineConfig", () => {
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
