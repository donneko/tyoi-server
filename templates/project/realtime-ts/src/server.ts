import { tyoi } from "@donneko/tyoi-server";
import { WebSocket } from "ws";
import { parseClientMessage } from "./client-message.js";
import { getServerPort } from "./server-port.js";

type ServerMessage = {
    type: "system" | "message" | "error";
    text: string;
    clients: number;
    timestamp: string;
};

const clients = new Set<WebSocket>();

function send(ws: WebSocket, message: ServerMessage): void {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(message));
}

function broadcast(type: ServerMessage["type"], text: string): void {
    const message: ServerMessage = {
        type,
        text,
        clients: clients.size,
        timestamp: new Date().toISOString(),
    };
    for (const client of clients) send(client, message);
}

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    port: getServerPort(process.env.PORT),
    autoPort: true,
});

app.get("/health", () => ({ ok: true, clients: clients.size }));

app.ws("/ws", ({ ws }) => {
    clients.add(ws);
    broadcast("system", "A client connected");

    ws.on("message", (value) => {
        const text = parseClientMessage(value.toString());
        if (!text) {
            send(ws, {
                type: "error",
                text: "Message must contain 1 to 500 characters",
                clients: clients.size,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        broadcast("message", text);
    });

    const disconnect = () => {
        if (!clients.delete(ws)) return;
        broadcast("system", "A client disconnected");
    };
    ws.once("close", disconnect);
    ws.once("error", disconnect);
});

await app.start({ browser: "local" });
