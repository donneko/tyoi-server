import { describe, expect, it, vi } from "vitest";
import { serverSummary } from "./server-summary.js";

const messages = new Map([
    [113, "started"],
    [114, "local:"],
    [115, "api:"],
    [116, "network:"],
    [117, "full:"],
    [118, "public:"],
    [119, "prefix:"],
    [120, "scan"],
    [121, "summary"],
    [122, "qr"],
]);

function createContext() {
    const logger = vi.fn((type: string, message?: string) => `${type}:${message ?? ""}`);
    return {
        context: {
            serverLogger: { logger },
            systemMetaManager: {
                getMeta: vi.fn((code: number) => ({ message: messages.get(code) ?? "" })),
            },
        },
        logger,
    };
}

describe("serverSummary", () => {
    it("ローカル公開のサーバー情報を表示する", () => {
        const { context, logger } = createContext();
        const qrcodeGenerate = vi.fn();

        serverSummary(
            {
                host: "127.0.0.1",
                port: 3000,
                publicPath: "public",
                publicFullPath: "/project/public",
                apiPrefix: "/api",
                showQrCode: true,
            },
            context as never,
            {
                createNetworkData: vi.fn(() => ({
                    networkUrl: "http://localhost:3000",
                    isLAN: false,
                })),
                qrcodeGenerate: qrcodeGenerate as never,
            }
        );

        expect(logger).toHaveBeenCalledWith("window", "summary", [
            "createSuccess:started",
            "createInfo:local:3000",
            "createInfo:api:3000",
            "createInfo:full:/project/public",
            "createInfo:public:public",
            "createInfo:prefix:/api",
        ]);
        expect(qrcodeGenerate).not.toHaveBeenCalled();
    });

    it("LAN 公開時はネットワーク URL と QR コードを表示する", () => {
        const { context, logger } = createContext();
        const qrcodeGenerate = vi.fn(
            (_url: string, _options: { small: boolean }, callback: (qr: string) => void) =>
                callback("QR DATA")
        );

        serverSummary(
            {
                host: "0.0.0.0",
                port: 4000,
                publicPath: "public",
                publicFullPath: "/project/public",
                apiPrefix: "/api",
                showQrCode: true,
            },
            context as never,
            {
                createNetworkData: vi.fn(() => ({
                    networkUrl: "http://192.168.1.10:4000",
                    isLAN: true,
                })),
                qrcodeGenerate: qrcodeGenerate as never,
            }
        );

        expect(logger).toHaveBeenCalledWith("createInfo", "network:http://192.168.1.10:4000");
        expect(qrcodeGenerate).toHaveBeenCalledWith(
            "http://192.168.1.10:4000",
            { small: true },
            expect.any(Function)
        );
        expect(logger).toHaveBeenCalledWith("window", "qr", [
            "createInfo:scan",
            "createInfo:QR DATA",
        ]);
    });

    it("showQrCode が false なら LAN 公開でも QR コードを生成しない", () => {
        const { context } = createContext();
        const qrcodeGenerate = vi.fn();

        serverSummary(
            {
                host: "0.0.0.0",
                port: 4000,
                publicPath: "public",
                publicFullPath: "/project/public",
                apiPrefix: "/api",
                showQrCode: false,
            },
            context as never,
            {
                createNetworkData: vi.fn(() => ({
                    networkUrl: "http://192.168.1.10:4000",
                    isLAN: true,
                })),
                qrcodeGenerate: qrcodeGenerate as never,
            }
        );

        expect(qrcodeGenerate).not.toHaveBeenCalled();
    });

    it("デフォルトの QR コード生成依存でも LAN サマリーを生成できる", () => {
        const { context, logger } = createContext();

        expect(() =>
            serverSummary(
                {
                    host: "0.0.0.0",
                    port: 4000,
                    publicPath: "public",
                    publicFullPath: "/project/public",
                    apiPrefix: "/api",
                    showQrCode: true,
                },
                context as never,
                {
                    createNetworkData: vi.fn(() => ({
                        networkUrl: "http://192.168.1.10:4000",
                        isLAN: true,
                    })),
                }
            )
        ).not.toThrow();

        expect(logger).toHaveBeenCalledWith("createInfo", expect.stringContaining("\n"));
    });
});
