import { describe, expect, it, vi } from "vitest";
import { browser } from "./open-browser.js";

function createContext() {
    return {
        serverLogger: { logger: vi.fn() },
        messageManager: {
            message: vi.fn(() => "LAN 公開が無効です"),
        },
    };
}

describe("browser", () => {
    it("target が false なら何もしない", async () => {
        const open = vi.fn();
        const createNetworkData = vi.fn();

        await browser({ host: "127.0.0.1", port: 3000, target: false }, createContext() as never, {
            open: open as never,
            createNetworkData,
        });

        expect(createNetworkData).not.toHaveBeenCalled();
        expect(open).not.toHaveBeenCalled();
    });

    it("LAN 公開で network 指定ならネットワーク URL を開く", async () => {
        const open = vi.fn(async () => undefined);
        const context = createContext();

        await browser({ host: "0.0.0.0", port: 3000, target: "lan" }, context as never, {
            open: open as never,
            createNetworkData: vi.fn(() => ({
                isLAN: true,
                networkUrl: "http://192.168.1.10:3000",
            })),
        });

        expect(open).toHaveBeenCalledWith("http://192.168.1.10:3000");
        expect(context.serverLogger.logger).not.toHaveBeenCalled();
    });

    it("LAN 公開でなければ警告して localhost を開く", async () => {
        const open = vi.fn(async () => undefined);
        const context = createContext();

        await browser({ host: "127.0.0.1", port: 3000, target: "lan" }, context as never, {
            open: open as never,
            createNetworkData: vi.fn(() => ({
                isLAN: false,
                networkUrl: "http://localhost:3000",
            })),
        });

        expect(context.serverLogger.logger).toHaveBeenCalledWith("warn", "LAN 公開が無効です");
        expect(open).toHaveBeenCalledWith("http://localhost:3000");
    });

    it("local 指定なら LAN 公開中でも localhost を開く", async () => {
        const open = vi.fn(async () => undefined);

        await browser({ host: "0.0.0.0", port: 4000, target: "local" }, createContext() as never, {
            open: open as never,
            createNetworkData: vi.fn(() => ({
                isLAN: true,
                networkUrl: "http://192.168.1.10:4000",
            })),
        });

        expect(open).toHaveBeenCalledWith("http://localhost:4000");
    });
});
