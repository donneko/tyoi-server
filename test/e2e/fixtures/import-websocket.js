import { Server } from "@donneko/tyoi-server";
import WebSocket from "ws";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
});

server.onWebSocket("/ws", ({ ws }) => {
    ws.send("connected");
});

await server.start();
const port = server.getPort();
const base = `ws://localhost:${port}`;

await testWs(`${base}/ws`);

async function testWs(url) {
    const socket = new WebSocket(url);

    socket.on("message", (data) => {
        if (data.toString() === "connected") {
            server.stop();
        }
    });
}
