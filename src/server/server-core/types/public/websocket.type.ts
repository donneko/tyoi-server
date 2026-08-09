import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";

/** WebSocket ハンドラに渡される接続情報です。 / Connection data passed to a WebSocket handler. */
export type WsHandler = {
    ws: WebSocket;
    req: IncomingMessage;
};
