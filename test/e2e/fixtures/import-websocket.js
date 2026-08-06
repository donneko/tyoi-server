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
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);
        const timeout = setTimeout(() => {
            socket.terminate();
            reject(new Error("WebSocket did not receive the connected message"));
        }, 3_000);

        socket.on("message", async (data) => {
            if (data.toString() !== "connected") return;

            clearTimeout(timeout);
            await server.stop();
            resolve();
        });

        socket.on("error", reject);
    });
}
