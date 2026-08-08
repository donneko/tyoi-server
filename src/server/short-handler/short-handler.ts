import { Server } from "../server-core/index.js";
import type http from "node:http";
import type {
    StartOptions,
    ServerOptions,
    Handler,
    WsHandler,
    RequestData,
} from "../server-core/index.js";
/**
 * `tyoi()` が返す簡易サーバー API。
 *
 * API と WebSocket を登録し、必要に応じて `server` から
 * 基盤となる `Server` の全機能へアクセスできます。
 *
 * A compact server API returned by `tyoi()`. Register HTTP APIs and WebSocket
 * handlers directly, or use `server` to access the complete underlying `Server` API.
 */
export class ShortHandler {
    private tyoiServer: Server;

    constructor(server: Server) {
        this.tyoiServer = server;
    }
    /** 基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance. */
    get server(): Server {
        return this.tyoiServer;
    }

    /** GET API ハンドラを登録します。 / Registers a GET API handler. */
    get(pass: string, fn: Handler<RequestData>): this {
        this.tyoiServer.onApi(`GET:${pass}`, fn);
        return this;
    }
    /** POST API ハンドラを登録します。 / Registers a POST API handler. */
    post(pass: string, fn: Handler<RequestData>): this {
        this.tyoiServer.onApi(`POST:${pass}`, fn);
        return this;
    }
    /** WebSocket ハンドラを登録します。 / Registers a WebSocket handler. */
    ws(pass: string, fn: Handler<WsHandler>): this {
        this.tyoiServer.onWebSocket(`${pass}`, fn);
        return this;
    }
    /** `start()` の別名です。 / Alias for `start()`. */
    async listen(options?: StartOptions): Promise<http.Server | undefined> {
        return this.start(options);
    }
    /** サーバーを起動します。 / Starts the server. */
    async start(options?: StartOptions): Promise<http.Server | undefined> {
        return this.tyoiServer.start(options);
    }
    /** `close()` の別名です。 / Alias for `close()`. */
    async stop(): Promise<void> {
        return this.close();
    }
    /** サーバーを停止し、接続の終了を待機します。 / Stops the server and waits for connections to close. */
    async close(): Promise<void> {
        return this.tyoiServer.stop();
    }
}

/**
 * API と WebSocket の登録を簡潔に行うサーバーを作成します。
 * Creates a server with a compact API for registering HTTP and WebSocket handlers.
 *
 * @param options サーバー設定。`root` は必須です。 / Server options. `root` is required.
 * @returns API 登録・起動・停止を行う簡易 API。 / A compact API for registration, startup, and shutdown.
 *
 * @example
 * ```ts
 * const app = tyoi({
 *   root: import.meta.dirname,
 *   public: "../public/main",
 * });
 *
 * app.get("/health", () => ({ ok: true }));
 * await app.start();
 * ```
 */
export function tyoi(options: ServerOptions): ShortHandler {
    const server = new Server(options);
    return new ShortHandler(server);
}
