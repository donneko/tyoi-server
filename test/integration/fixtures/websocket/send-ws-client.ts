import { Server } from "../../../../src/index.js";
import WebSocket from "ws";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
});

server.onWebSocket("/ws", ({ ws }) => {
    ws.on("message", (data) => {
        if (data.toString() === "hello") {
            process.exit(0);
        }
    });
});

await server.start();
const port = server.getPort();

await testWs(`ws://localhost:${port}/ws`);

async function testWs(url: string): Promise<void> {
    const socket = new WebSocket(url);

    socket.on("open", () => {
        socket.send("hello");
    });
}
