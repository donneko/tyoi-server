import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";

export type WsHandler = {
    ws: WebSocket;
    req: IncomingMessage;
};
