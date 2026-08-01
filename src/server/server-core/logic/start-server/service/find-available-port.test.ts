import { describe, expect, it, vi } from "vitest";
import { CustomError } from "../../../error/custom-error.js";
import { findAvailablePort } from "./find-available-port.js";

function createContext() {
    const logger = vi.fn((type: string, message?: string) => ({
        createMessage: `${type}:${message ?? ""}`,
    }));
    const messages = new Map([
        ["server.port.unavailable", "port {port} is used"],
        ["server.port.useAlternativePrompt", "use port {port}?"],
        ["server.port.rejected", "port {port} was rejected"],
        ["server.port.selected", "using port {port}"],
    ]);

    return {
        context: {
            serverLogger: { logger },
            messageManager: {
                message: vi.fn((key: string, variables: { port: number }) =>
                    (messages.get(key) ?? "").replace("{port}", String(variables.port))
                ),
            },
        },
        logger,
    };
}

describe("findAvailablePort", () => {
    it("開始ポートが空いていればそのまま返す", async () => {
        const { context } = createContext();
        const isPortUsed = vi.fn(async () => false);
        const askPermission = vi.fn();

        await expect(
            findAvailablePort(
                { startPort: 3000, host: "127.0.0.1", isAutoPort: false },
                context as never,
                { isPortUsed, askPermission }
            )
        ).resolves.toBe(3000);
        expect(askPermission).not.toHaveBeenCalled();
    });

    it("autoPort が有効なら空きポートまで自動で進める", async () => {
        const { context } = createContext();
        const isPortUsed = vi
            .fn()
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false);
        const askPermission = vi.fn();

        await expect(
            findAvailablePort(
                { startPort: 3000, host: "127.0.0.1", isAutoPort: true },
                context as never,
                { isPortUsed, askPermission }
            )
        ).resolves.toBe(3002);
        expect(isPortUsed.mock.calls.map(([port]) => port)).toEqual([3000, 3001, 3002]);
        expect(askPermission).not.toHaveBeenCalled();
    });

    it("手動確認で許可された場合は次のポートを試す", async () => {
        const { context, logger } = createContext();
        const isPortUsed = vi.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false);
        const askPermission = vi.fn(async () => true);

        await expect(
            findAvailablePort(
                { startPort: 3000, host: "127.0.0.1", isAutoPort: false },
                context as never,
                { isPortUsed, askPermission }
            )
        ).resolves.toBe(3001);
        expect(askPermission).toHaveBeenCalledWith("createSystem:use port 3001?");
        expect(logger).toHaveBeenCalledWith("info", "using port 3001");
    });

    it("手動確認で拒否された場合は CustomError を投げる", async () => {
        const { context } = createContext();

        const promise = findAvailablePort(
            { startPort: 3000, host: "127.0.0.1", isAutoPort: false },
            context as never,
            {
                isPortUsed: vi.fn(async () => true),
                askPermission: vi.fn(async () => false),
            }
        );

        await expect(promise).rejects.toMatchObject<Partial<CustomError>>({
            message: "port 3000 was rejected",
            errorName: "PORT_NOT_PERMISSION",
        });
    });
});
