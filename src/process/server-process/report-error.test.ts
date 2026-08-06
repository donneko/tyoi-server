import { describe, expect, it, vi } from "vitest";
import { reportServerError } from "./report-error.js";

describe("reportServerError", () => {
    it("IPC切断済みでも二次例外を起こさず切断処理を試みる", () => {
        const processSender = {
            connected: false,
            send: vi.fn(),
            disconnect: vi.fn(),
        };

        expect(() =>
            reportServerError(new Error("server failed"), processSender as never)
        ).not.toThrow();
        expect(processSender.send).not.toHaveBeenCalled();
        expect(processSender.disconnect).toHaveBeenCalledOnce();
    });
});
