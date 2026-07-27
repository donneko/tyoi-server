import { describe, expect, it, vi } from "vitest";
import { setupSignalStop } from "./setup-signal-stop.js";

describe("setupSignalStop", () => {
    it("有効時は SIGINT と SIGTERM に停止ハンドラを登録する", () => {
        const stopHandler = vi.fn();
        const processOn = vi.fn();

        setupSignalStop(true, { stopHandler }, { processOn: processOn as never });

        expect(processOn).toHaveBeenCalledTimes(2);
        expect(processOn).toHaveBeenNthCalledWith(1, "SIGINT", stopHandler);
        expect(processOn).toHaveBeenNthCalledWith(2, "SIGTERM", stopHandler);
    });

    it("無効時はシグナルハンドラを登録しない", () => {
        const processOn = vi.fn();

        setupSignalStop(false, { stopHandler: vi.fn() }, { processOn: processOn as never });

        expect(processOn).not.toHaveBeenCalled();
    });
});
