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
        const cleanup = mainProcessSetup(child as never);

        try {
            process.emit("SIGINT");
            expect(child.kill).toHaveBeenCalledOnce();
        } finally {
            cleanup();
        }
    });
});
