import { describe, expect, it, vi } from "vitest";
import { serverProcessSetup } from "./server-process-setup.js";

describe("serverProcessSetup", () => {
    it("終了シグナルを親プロセスへ通知し、二回目は強制終了を要求する", () => {
        const processOn = vi.fn();
        const processOff = vi.fn();
        const processSend = vi.fn();
        const processExit = vi.fn();

        const controller = serverProcessSetup({
            processOn: processOn as never,
            processOff: processOff as never,
            processSend,
            processExit: processExit as never,
        });

        expect(processOn).toHaveBeenNthCalledWith(1, "SIGINT", expect.any(Function));
        expect(processOn).toHaveBeenNthCalledWith(2, "SIGTERM", expect.any(Function));

        const sigintHandler = processOn.mock.calls[0]?.[1];
        sigintHandler?.();
        sigintHandler?.();

        expect(processSend).toHaveBeenNthCalledWith(1, process, {
            type: "shutdownRequest",
            force: false,
        });
        expect(processSend).toHaveBeenNthCalledWith(2, process, {
            type: "shutdownRequest",
            force: true,
        });
        expect(processExit).not.toHaveBeenCalled();

        controller.cleanup();
        expect(processOff).toHaveBeenNthCalledWith(1, "SIGINT", sigintHandler);
        expect(processOff).toHaveBeenNthCalledWith(2, "SIGTERM", processOn.mock.calls[1]?.[1]);
    });

    it("IPC通知に失敗した場合は子プロセスを終了する", () => {
        const processOn = vi.fn();
        const processExit = vi.fn();

        serverProcessSetup({
            processOn: processOn as never,
            processOff: vi.fn() as never,
            processSend: vi.fn(() => {
                throw new Error("IPC disconnected");
            }),
            processExit: processExit as never,
        });

        const sigintHandler = processOn.mock.calls[0]?.[1];
        sigintHandler?.();

        expect(processExit).toHaveBeenCalledWith(1);
    });
});
