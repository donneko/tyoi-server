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
 */
export class ShortHandler {
    private tyoiServer: Server;

    constructor(server: Server) {
        this.tyoiServer = server;
    }
    /** 基盤となる `Server` インスタンスを取得します。 */
    get server(): Server {
        return this.tyoiServer;
    }

    /** GET API ハンドラを登録します。 */
    get(pass: string, fn: Handler<RequestData>): this {
        this.tyoiServer.onApi(`GET:${pass}`, fn);
        return this;
    }
    /** POST API ハンドラを登録します。 */
    post(pass: string, fn: Handler<RequestData>): this {
        this.tyoiServer.onApi(`POST:${pass}`, fn);
        return this;
    }
    /** WebSocket ハンドラを登録します。 */
    ws(pass: string, fn: Handler<WsHandler>): this {
        this.tyoiServer.onWebSocket(`${pass}`, fn);
        return this;
    }
    /** `start()` の別名です。 */
    async listen(options?: StartOptions): Promise<http.Server | undefined> {
        return this.start(options);
    }
    /** サーバーを起動します。 */
    async start(options?: StartOptions): Promise<http.Server | undefined> {
        return this.tyoiServer.start(options);
    }
    /** `close()` の別名です。 */
    async stop(): Promise<void> {
        return this.close();
    }
    /** サーバーを停止し、接続の終了を待機します。 */
    async close(): Promise<void> {
        return this.tyoiServer.stop();
    }
}

/**
 * API と WebSocket の登録を簡潔に行うサーバーを作成します。
 *
 * @param options サーバー設定。`root` は必須です。
 * @returns API 登録・起動・停止を行う簡易 API。
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
