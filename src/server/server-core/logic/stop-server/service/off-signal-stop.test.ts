import { describe, expect, it, vi } from "vitest";
import { offSignalStop } from "./off-signal-stop.js";

describe("offSignalStop", () => {
    it("SIGINT と SIGTERM のリスナーを解除する", () => {
        const expressServer = vi.fn();
        const processOff = vi.fn();

        offSignalStop(
            { expressServer: expressServer as never },
            { processOff: processOff as never }
        );

        expect(processOff).toHaveBeenCalledTimes(2);
        expect(processOff).toHaveBeenNthCalledWith(1, "SIGINT", expressServer);
        expect(processOff).toHaveBeenNthCalledWith(2, "SIGTERM", expressServer);
    });
});
