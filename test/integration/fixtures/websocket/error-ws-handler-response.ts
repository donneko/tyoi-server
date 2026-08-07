import { Server } from "../../../../src/index.js";
import WebSocket from "ws";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
});

server.onWebSocket("/ws", () => {
    throw new Error();
});

await server.start();
const port = server.getPort();

await testWs(`ws://localhost:${port}/ws`);

async function testWs(url: string): Promise<void> {
    const socket = new WebSocket(url);

    socket.on("close", (code) => {
        if (code === 1011) process.exit(0);
    });
}
