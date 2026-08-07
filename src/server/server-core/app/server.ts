import type http from "node:http";
import type { StartOptions, ServerOptions } from "../types/server.type.js";
import { createServerContext } from "../context/create-server-context.js";
import { isServerStop, stopServer } from "../logic/stop-server/index.js";
import { setupExpress } from "../logic/setup-express/index.js";
import { setupServer } from "../logic/setup-server/index.js";
import { startServer, isServerStart } from "../logic/start-server/index.js";
import { removeUndefined } from "../service/remove-undefined.js";

/**
 * HTTP API、WebSocket、静的ファイル配信を提供するサーバーです。
 *
 * @typeParam RequestNameList 登録できる HTTP API キー（例: `"GET:/health"`）。
 * @typeParam WebSocketNameList 登録できる WebSocket パス。
 */
export class Server<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
> {
    private serverContext = createServerContext<RequestNameList, WebSocketNameList>(
        this.stop.bind(this)
    );

    private httpServer: http.Server | null = null;

    /**
     * サーバーを作成し、ルーティングと静的ファイル配信を初期化します。
     *
     * `root` は必須です。起動は `start()` で明示的に行います。
     *
     * @param options サーバー設定。
     * @example
     *  import { Server } from "@donneko/tyoi-server";
     *
     *  type RequestNameList = "GET:/test" | "GET:/test/a" | "GET:/a";
     *
     *  const server = new Server<RequestNameList>({
     *      root: import.meta.dirname,
     *      public:"../public/main",
     *      api:"/api",
     *      port:3000,
     *  });
     *
     *  server.onApi("GET:/test", (data) => {
     *      return data;
     *  });
     *  await server.start();
     */
    constructor(options?: ServerOptions) {
        if (options) {
            this.serverContext.serverConfig.updateConfig(removeUndefined(options));
        }

        setupServer(this.serverContext);
        setupExpress(this.serverContext);
    }

    /** `start()` の別名です。 */
    async listen(options?: StartOptions): Promise<http.Server | undefined> {
        return this.start(options);
    }
    private isStarting: boolean = false;
    /**
     * HTTP サーバーを起動します。
     *
     * `options` はコンストラクターで渡した設定を、この起動に限らず
     * 上書きします。すでに起動済み、または起動処理中の場合は `undefined` を返します。
     *
     * @param options 起動時に上書きする設定。
     * @returns 起動した HTTP サーバー。すでに起動済みの場合は `undefined`。
     * @throws ポートの確保や HTTP サーバーの起動に失敗した場合。
     * @example
     * ```ts
     * await server.start({
     *   port: 3000,
     *   qr: false,
     * });
     * ```
     */
    async start(options?: StartOptions): Promise<http.Server | undefined> {
        const context = this.serverContext;

        if (!isServerStart(this.httpServer, this.isStarting)) {
            context.serverLogger.logger(
                "warn",
                context.messageManager.message("server.start.alreadyRunning")
            );
            return;
        }

        this.isStarting = true;

        const httpServer = await startServer(options, context).finally(() => {
            this.isStarting = false;
        });

        this.httpServer = httpServer;

        return httpServer;
    }

    /** `stop()` の別名です。 */
    async close(): Promise<void> {
        return this.stop();
    }

    private isStopping: boolean = false;
    /**
     * HTTP サーバーを停止し、既存の接続を終了します。
     *
     * 接続が 10 秒以内に閉じない場合は、残った接続を強制的に閉じます。
     * 起動していない場合、または停止処理中の場合は何もしません。
     *
     * @returns 停止完了時に解決する Promise。
     * @throws HTTP サーバーの停止に失敗した場合。
     */
    async stop(): Promise<void> {
        const context = this.serverContext;

        if (!isServerStop(this.httpServer, this.isStopping)) return;

        this.isStopping = true;

        const httpServer = this.httpServer;
        await stopServer(httpServer, context).finally(() => {
            if (!httpServer.listening) {
                this.httpServer = null;
            }
            this.isStopping = false;
        });
    }

    /** サーバーが起動中かを返します。 */
    isRunning(): boolean {
        return Boolean(this.httpServer);
    }
    /** 現在設定されているポート番号を返します。 */
    getPort(): number {
        return this.serverContext.serverConfig.getConfig("port");
    }
    /** 基盤となる Node.js の HTTP サーバーを取得します。 */
    getHttpServer(): http.Server | null {
        return this.httpServer;
    }
    /** 解決済みのサーバー設定を取得します。 */
    getConfig = this.serverContext.serverConfig.getConfig.bind(this.serverContext.serverConfig);

    /** イベントハンドラを登録します。 */
    onEvent = this.serverContext.outEventBus.on.bind(this.serverContext.outEventBus);
    /** 一度だけ実行するイベントハンドラを登録します。 */
    onceEvent = this.serverContext.outEventBus.once.bind(this.serverContext.outEventBus);
    /** イベントハンドラを解除します。 */
    offEvent = this.serverContext.outEventBus.off.bind(this.serverContext.outEventBus);
    /** 指定したイベントにハンドラが登録されているかを返します。 */
    hasEvent = this.serverContext.outEventBus.has.bind(this.serverContext.outEventBus);

    /** HTTP API ハンドラを登録します。 */
    onApi = this.serverContext.apiRegistry.on.bind(this.serverContext.apiRegistry);
    /** 一度だけ実行する HTTP API ハンドラを登録します。 */
    onceApi = this.serverContext.apiRegistry.once.bind(this.serverContext.apiRegistry);
    /** HTTP API ハンドラを解除します。 */
    offApi = this.serverContext.apiRegistry.off.bind(this.serverContext.apiRegistry);
    /** 指定した HTTP API ハンドラが登録されているかを返します。 */
    hasApi = this.serverContext.apiRegistry.has.bind(this.serverContext.apiRegistry);
    /** HTTP API ハンドラをリクエストなしで実行します。 */
    emitApi = this.serverContext.apiRegistry.emit.bind(this.serverContext.apiRegistry);

    /** WebSocket ハンドラを登録します。 */
    onWebSocket = this.serverContext.webSocketRouter.on.bind(this.serverContext.webSocketRouter);
    /** 一度だけ実行する WebSocket ハンドラを登録します。 */
    onceWebSocket = this.serverContext.webSocketRouter.once.bind(
        this.serverContext.webSocketRouter
    );
    /** WebSocket ハンドラを解除します。 */
    offWebSocket = this.serverContext.webSocketRouter.off.bind(this.serverContext.webSocketRouter);
    /** 指定した WebSocket ハンドラが登録されているかを返します。 */
    hasWebSocket = this.serverContext.webSocketRouter.has.bind(this.serverContext.webSocketRouter);
}
