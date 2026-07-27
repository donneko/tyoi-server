import { describe, expect, it, vi } from "vitest";
import { stopServer } from "./stop-server.js";

const messages = new Map([
    [104, "stopping"],
    [106, "stop failed"],
    [107, "stopped"],
]);

function createContext() {
    const calls: string[] = [];
    return {
        calls,
        context: {
            webSocketRouter: {
                close: vi.fn(async () => {
                    calls.push("websocket");
                }),
            },
            serverLogger: {
                logger: vi.fn((type: string) => {
                    calls.push(`log:${type}`);
                }),
            },
            systemMetaManager: {
                getMeta: vi.fn((code: number) => ({ message: messages.get(code) ?? "" })),
            },
            expressServer: vi.fn(),
        },
    };
}

describe("stopServer", () => {
    it("WebSocket と HTTP サーバーを正常に停止する", async () => {
        const { context, calls } = createContext();
        const finishObj = { finish: vi.fn(), settled: false };
        const httpServer = {
            close: vi.fn((callback: (error?: Error) => void) => {
                calls.push("http");
                callback();
            }),
            closeIdleConnections: vi.fn(() => {
                calls.push("idle");
            }),
        };
        const offSignalStop = vi.fn(() => {
            calls.push("signal");
        });

        await expect(
            stopServer(httpServer as never, context as never, {
                createFinish: vi.fn(() => finishObj),
                offSignalStop,
            })
        ).resolves.toBeUndefined();

        expect(calls[0]).toBe("websocket");
        expect(offSignalStop).toHaveBeenCalledWith(context);
        expect(httpServer.close).toHaveBeenCalledOnce();
        expect(httpServer.closeIdleConnections).toHaveBeenCalledOnce();
        expect(context.serverLogger.logger).toHaveBeenCalledWith("success", "stopped");
        expect(finishObj.finish).toHaveBeenCalledOnce();
    });

    it("HTTP サーバー停止エラーをログに記録して reject する", async () => {
        const { context } = createContext();
        const error = new Error("close failed");
        const finishObj = { finish: vi.fn(), settled: false };
        const httpServer = {
            close: vi.fn((callback: (error?: Error) => void) => callback(error)),
            closeIdleConnections: vi.fn(),
        };

        await expect(
            stopServer(httpServer as never, context as never, {
                createFinish: vi.fn(() => finishObj),
                offSignalStop: vi.fn(),
            })
        ).rejects.toBe(error);

        expect(context.serverLogger.logger).toHaveBeenCalledWith("error", "stop failed");
        expect(finishObj.finish).toHaveBeenCalledOnce();
    });

    it("タイムアウトで完了済みなら遅れて来た close callback を無視する", async () => {
        const { context } = createContext();
        let closeCallback: ((error?: Error) => void) | undefined;
        const finishObj = { finish: vi.fn(), settled: true };
        const httpServer = {
            close: vi.fn((callback: (error?: Error) => void) => {
                closeCallback = callback;
            }),
            closeIdleConnections: vi.fn(),
        };
        const promise = stopServer(httpServer as never, context as never, {
            createFinish: vi.fn((_server, resolve) => {
                resolve();
                return finishObj;
            }),
            offSignalStop: vi.fn(),
        });

        await expect(promise).resolves.toBeUndefined();
        closeCallback?.(new Error("late error"));

        expect(context.serverLogger.logger).not.toHaveBeenCalledWith("error", "stop failed");
        expect(finishObj.finish).not.toHaveBeenCalled();
    });

    it("WebSocket の停止失敗時は HTTP 停止処理へ進まない", async () => {
        const error = new Error("websocket close failed");
        const { context } = createContext();
        context.webSocketRouter.close.mockRejectedValueOnce(error);
        const httpServer = {
            close: vi.fn(),
            closeIdleConnections: vi.fn(),
        };

        await expect(
            stopServer(httpServer as never, context as never, {
                createFinish: vi.fn(),
                offSignalStop: vi.fn(),
            })
        ).rejects.toBe(error);
        expect(httpServer.close).not.toHaveBeenCalled();
    });
});
