import { Server } from "../../../src/index.js";
import WebSocket from "ws";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
});

server.onWebSocket("/ws", ({ ws }) => {
    ws.on("open", () => {
        process.exit(0);
    });
});

await server.start();
const port = server.getPort();

await testWs(`ws://localhost:${port}/ws`);

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
