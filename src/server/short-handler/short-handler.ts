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
 *
 * @typeParam RequestNameList 登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.
 * @typeParam WebSocketNameList 登録できる WebSocket パス。 / WebSocket paths that can be registered.
 */
export class ShortHandler<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
> {
    private tyoiServer: Server<RequestNameList, WebSocketNameList>;

    constructor(server: Server<RequestNameList, WebSocketNameList>) {
        this.tyoiServer = server;
    }
    /** 基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance. */
    get server(): Server<RequestNameList, WebSocketNameList> {
        return this.tyoiServer;
    }

    /** 型付きキーの `GET:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `GET:` key. */
    get(
        pass: string extends RequestNameList
            ? string
            : RequestNameList extends `GET:${infer Path}`
              ? Path
              : never,
        fn: Handler<RequestData>
    ): this {
        this.tyoiServer.onApi(`GET:${pass}` as RequestNameList, fn);
        return this;
    }
    /** 型付きキーの `POST:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `POST:` key. */
    post(
        pass: string extends RequestNameList
            ? string
            : RequestNameList extends `POST:${infer Path}`
              ? Path
              : never,
        fn: Handler<RequestData>
    ): this {
        this.tyoiServer.onApi(`POST:${pass}` as RequestNameList, fn);
        return this;
    }
    /** WebSocket ハンドラを登録します。 / Registers a WebSocket handler. */
    ws(pass: WebSocketNameList, fn: Handler<WsHandler>): this {
        this.tyoiServer.onWebSocket(pass, fn);
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
 * @typeParam RequestNameList 登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.
 * @typeParam WebSocketNameList 登録できる WebSocket パス。 / WebSocket paths that can be registered.
 * @param options サーバー設定。`root` は必須です。 / Server options. `root` is required.
 * @returns API 登録・起動・停止を行う簡易 API。 / A compact API for registration, startup, and shutdown.
 *
 * @example
 * ```ts
 * type ApiKeys = "GET:/health";
 * type WebSocketKeys = "/events";
 *
 * const app = tyoi<ApiKeys, WebSocketKeys>({
 *   root: import.meta.dirname,
 *   public: "../public/main",
 * });
 *
 * app.get("/health", () => ({ status: "ok" }));
 * await app.start();
 * ```
 */
export function tyoi<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
>(options: ServerOptions): ShortHandler<RequestNameList, WebSocketNameList> {
    const server = new Server<RequestNameList, WebSocketNameList>(options);
    return new ShortHandler(server);
}
