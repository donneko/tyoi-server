import { Server } from "../../../../src/index.js";
import WebSocket from "ws";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
});

server.onWebSocket("/ws", ({ ws }) => {
    ws.send("connected");
});

await server.start();
const port = server.getPort();

await testWs(`ws://localhost:${port}/ws`);

await server.stop();

async function testWs(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const time = setTimeout(() => {
            reject();
        }, 3000);
        const socket = new WebSocket(url);

        socket.on("open", () => {
            clearTimeout(time);
            resolve();
        });
    });
}
