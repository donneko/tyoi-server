import type { ConnectionState, WebSocketMessage } from "../../types/main.type";

type Socket = Pick<WebSocket, "close" | "onopen" | "onmessage" | "onerror" | "onclose">;

export function connectUpdates({
    url,
    WebSocket,
    setTimeout,
    clearTimeout,
    onState,
    onMessage,
}: {
    url: string;
    WebSocket: new (url: string) => Socket;
    setTimeout: (handler: () => void, timeout: number) => number;
    clearTimeout: (id: number) => void;
    onState: (state: ConnectionState) => void;
    onMessage: (message: WebSocketMessage) => void;
}): () => void {
    let socket: Socket | undefined;
    let reconnectTimer: number | undefined;
    let closed = false;

    const connect = () => {
        onState("connecting");
        socket = new WebSocket(url);
        socket.onopen = () => onState("connected");
        socket.onmessage = (event) => onMessage(JSON.parse(String(event.data)) as WebSocketMessage);
        socket.onerror = () => onState("error");
        socket.onclose = () => {
            onState("disconnected");
            if (!closed) reconnectTimer = setTimeout(connect, 2000);
        };
    };

    connect();
    return () => {
        closed = true;
        if (reconnectTimer !== undefined) clearTimeout(reconnectTimer);
        socket?.close();
    };
}
