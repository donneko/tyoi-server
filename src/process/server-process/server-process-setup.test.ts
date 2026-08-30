import { describe, expect, it, vi } from "vitest";
import { serverProcessSetup } from "./server-process-setup.js";

describe("serverProcessSetup", () => {
    it("SIGINT と SIGTERM で子プロセスが終了しないようハンドラーを登録する", () => {
        const processOn = vi.fn();

        serverProcessSetup({ processOn: processOn as never });

        expect(processOn).toHaveBeenNthCalledWith(1, "SIGINT", expect.any(Function));
        expect(processOn).toHaveBeenNthCalledWith(2, "SIGTERM", expect.any(Function));

        const sigintHandler = processOn.mock.calls[0]?.[1];
        const sigtermHandler = processOn.mock.calls[1]?.[1];
        expect(() => sigintHandler?.()).not.toThrow();
        expect(() => sigtermHandler?.()).not.toThrow();
    });
});
