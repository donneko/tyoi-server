import { describe, expect, it, vi } from "vitest";
import { mainProcessSetup } from "./main-process-setup.js";

describe("mainProcessSetup", () => {
    it("shutdown IPC の送信に失敗した場合は子プロセスを kill する", () => {
        const child = {
            connected: true,
            send: vi.fn(() => {
                throw new Error("IPC send failed");
            }),
            kill: vi.fn(),
        };
        const controller = mainProcessSetup(child as never);

        try {
            process.emit("SIGINT");
            expect(child.kill).toHaveBeenCalledOnce();
            expect(child.kill).toHaveBeenCalledWith("SIGKILL");
        } finally {
            controller.cleanup();
        }
    });

    it("二回目の終了シグナルでは子プロセスを強制終了する", () => {
        const child = {
            connected: true,
            send: vi.fn(),
            kill: vi.fn(),
        };
        const controller = mainProcessSetup(child as never);

        try {
            process.emit("SIGINT");
            process.emit("SIGINT");

            expect(child.send).toHaveBeenCalledOnce();
            expect(child.kill).toHaveBeenCalledOnce();
            expect(child.kill).toHaveBeenCalledWith("SIGKILL");
        } finally {
            controller.cleanup();
        }
    });
});
