import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { serverRuntime } from "./main-process.js";

class FakeChildProcess extends EventEmitter {
    connected = true;
    send = vi.fn();
    disconnect = vi.fn();
    kill = vi.fn();
}

function createRuntime() {
    const child = new FakeChildProcess();
    const processSend = vi.fn();
    const mainProcessSetup = vi.fn();
    const promise = serverRuntime(
        "config.js",
        { port: 3000 },
        {
            fork: vi.fn(() => child) as never,
            mainProcessSetup,
            processSend,
        }
    );

    return { child, processSend, mainProcessSetup, promise };
}

describe("serverRuntime", () => {
    it("ready 後も稼働を監視し、stopped で完了する", async () => {
        const { child, promise } = createRuntime();
        let settled = false;
        void promise.finally(() => {
            settled = true;
        });

        child.emit("message", { type: "ready", data: { port: 3000 } });
        await Promise.resolve();
        expect(settled).toBe(false);

        child.emit("message", { type: "stopped" });

        await expect(promise).resolves.toBeUndefined();
    });

    it("ready 後に届いたエラーも reject して子プロセスを終了する", async () => {
        const { child, promise } = createRuntime();

        child.emit("message", { type: "ready", data: { port: 3000 } });
        child.emit("message", { type: "error", message: "shutdown failed" });

        await expect(promise).rejects.toThrow("shutdown failed");
        expect(child.disconnect).toHaveBeenCalledOnce();
        expect(child.kill).toHaveBeenCalledOnce();
    });

    it.each([
        ["before startup", false],
        ["after startup", true],
    ])("子プロセスが %s に異常終了した場合は reject する", async (phase, ready) => {
        const { child, promise } = createRuntime();
        if (ready) {
            child.emit("message", { type: "ready", data: { port: 3000 } });
        }

        child.emit("exit", 1, null);

        await expect(promise).rejects.toThrow(`Server process exited ${phase}`);
    });

    it("stopped 通知前の IPC 切断で reject する", async () => {
        const { child, promise } = createRuntime();

        child.emit("disconnect");

        await expect(promise).rejects.toThrow("Server process disconnected unexpectedly");
    });

    it("boot と start メッセージを順番に送る", () => {
        const { processSend, mainProcessSetup } = createRuntime();

        expect(mainProcessSetup).toHaveBeenCalledOnce();
        expect(processSend).toHaveBeenNthCalledWith(1, expect.anything(), {
            type: "boot",
            data: { path: "config.js", option: { port: 3000 } },
        });
        expect(processSend).toHaveBeenNthCalledWith(2, expect.anything(), {
            type: "start",
        });
    });

    it("初期 IPC 送信に失敗した場合もシグナル cleanup を実行する", async () => {
        const child = new FakeChildProcess();
        const error = new Error("IPC send failed");
        const cleanup = vi.fn();
        const promise = serverRuntime(
            "config.js",
            { port: 3000 },
            {
                fork: vi.fn(() => child) as never,
                mainProcessSetup: vi.fn(() => cleanup),
                processSend: vi.fn(() => {
                    throw error;
                }),
            }
        );

        await expect(promise).rejects.toBe(error);
        expect(cleanup).toHaveBeenCalledOnce();
        expect(child.disconnect).toHaveBeenCalledOnce();
        expect(child.kill).toHaveBeenCalledOnce();
    });

    it("エラー通知時の disconnect 失敗でも子プロセスを kill する", async () => {
        const child = new FakeChildProcess();
        const error = new Error("server failed");
        child.disconnect.mockImplementationOnce(() => {
            throw new Error("already disconnected");
        });
        const promise = serverRuntime(
            "config.js",
            { port: 3000 },
            {
                fork: vi.fn(() => child) as never,
                mainProcessSetup: vi.fn(() => vi.fn()),
                processSend: vi.fn(),
            }
        );

        child.emit("message", { type: "error", message: error.message });

        await expect(promise).rejects.toThrow(error.message);
        expect(child.kill).toHaveBeenCalledOnce();
    });
});
