import { ApiRegistry, type ApiRegistryHandler } from "../util/api-registry.js";
import { WebSocket, WebSocketServer } from "ws";
import type { Server } from "node:http";
import type { Duplex } from "node:stream";
import type { WsHandler } from "../types/server.type.js";

export class WebSocketRouter<typeMAP extends string> {
    private webSocketRegistry = new ApiRegistry<Record<typeMAP, WsHandler>>();
    private webSocket: WebSocketServer | null = null;
    start(server: Server) {
        const ws = new WebSocketServer({
            noServer: true,
        });
        this.webSocket = ws;
        server.on("upgrade", (req, socket, head) => {
            let url: URL;
            try {
                url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
            } catch {
                socket.destroy();
                return;
            }
            const pathname = url.pathname;

            if (!this.webSocketRegistry.has(pathname)) {
                socket.destroy();
                return;
            }

            ws.handleUpgrade(req, socket as Duplex, head, (client) => {
                void this.webSocketRegistry
                    .emit(pathname, { ws: client, req })
                    .catch(() => client.close(1011, "WebSocket handler failed"));
            });
        });
    }
    async close() {
        const webSocketServer = this.webSocket;

        if (!webSocketServer) {
            return;
        }

        for (const client of webSocketServer.clients) {
            client.close(1001, "Server shutting down");
        }

        const forceCloseTimer = setTimeout(() => {
            for (const client of webSocketServer.clients) {
                if (client.readyState !== WebSocket.CLOSED) {
                    client.terminate();
                }
            }
        }, 3_000);

        try {
            await new Promise<void>((resolve, reject) => {
                webSocketServer.close((error) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve();
                });
            });
        } finally {
            clearTimeout(forceCloseTimer);
            this.webSocket = null;
        }
    }

    // WebSocket登録
    on<Key extends typeMAP>(type: Key, fn: ApiRegistryHandler<WsHandler>) {
        return this.webSocketRegistry.on(type, fn);
    }
    // WebSocket一度のみ起動
    once<Key extends typeMAP>(type: Key, fn: ApiRegistryHandler<WsHandler>) {
        return this.webSocketRegistry.once(type, fn);
    }
    // WebSocket消去
    off<Key extends typeMAP>(type: Key) {
        this.webSocketRegistry.off(type);
    }
    // WebSocketが存在するか？
    has(type: string) {
        return this.webSocketRegistry.has(type);
    }
}
