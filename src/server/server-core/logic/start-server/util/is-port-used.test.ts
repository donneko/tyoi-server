import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { isPortUsed } from "./is-port-used.js";

class FakeNetServer extends EventEmitter {
    closeCallback: ((error?: Error) => void) | undefined;
    close = vi.fn((callback?: (error?: Error) => void) => {
        this.closeCallback = callback;
    });
    listen = vi.fn();
}

describe("isPortUsed", () => {
    it("EADDRINUSE を受け取った場合は true を返す", async () => {
        const server = new FakeNetServer();
        const promise = isPortUsed(3000, "127.0.0.1", {
            createServer: vi.fn(() => server) as never,
        });

        server.emit("error", Object.assign(new Error("in use"), { code: "EADDRINUSE" }));

        await expect(promise).resolves.toBe(true);
        expect(server.listen).toHaveBeenCalledWith(3000, "127.0.0.1");
    });

    it("EADDRINUSE 以外のエラーは未使用として扱う", async () => {
        const server = new FakeNetServer();
        const promise = isPortUsed(3000, "127.0.0.1", {
            createServer: vi.fn(() => server) as never,
        });

        server.emit("error", Object.assign(new Error("denied"), { code: "EACCES" }));

        await expect(promise).resolves.toBe(false);
    });

    it("listen できた場合はサーバーを閉じて false を返す", async () => {
        const server = new FakeNetServer();
        const promise = isPortUsed(3000, "127.0.0.1", {
            createServer: vi.fn(() => server) as never,
        });

        server.emit("listening");
        server.closeCallback?.();

        await expect(promise).resolves.toBe(false);
        expect(server.close).toHaveBeenCalledOnce();
    });

    it("close 完了前には空きポートと判定しない", async () => {
        const server = new FakeNetServer();
        const promise = isPortUsed(3000, "127.0.0.1", {
            createServer: vi.fn(() => server) as never,
        });
        let settled = false;
        void promise.then(() => {
            settled = true;
        });

        server.emit("listening");
        await Promise.resolve();

        expect(settled).toBe(false);
        server.closeCallback?.();
        await expect(promise).resolves.toBe(false);
    });
});
