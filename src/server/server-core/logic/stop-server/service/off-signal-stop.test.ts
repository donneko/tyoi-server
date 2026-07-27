import { describe, expect, it, vi } from "vitest";
import { offSignalStop } from "./off-signal-stop.js";

describe("offSignalStop", () => {
    it("SIGINT と SIGTERM のリスナーを解除する", () => {
        const stopHandler = vi.fn();
        const processOff = vi.fn();

        offSignalStop({ stopHandler }, { processOff: processOff as never });

        expect(processOff).toHaveBeenCalledTimes(2);
        expect(processOff).toHaveBeenNthCalledWith(1, "SIGINT", stopHandler);
        expect(processOff).toHaveBeenNthCalledWith(2, "SIGTERM", stopHandler);
    });

    it("デフォルト依存で実際の process リスナーを解除する", () => {
        const stopHandler = vi.fn();
        process.on("SIGINT", stopHandler);
        process.on("SIGTERM", stopHandler);

        offSignalStop({ stopHandler });

        expect(process.listeners("SIGINT")).not.toContain(stopHandler);
        expect(process.listeners("SIGTERM")).not.toContain(stopHandler);
    });
});
