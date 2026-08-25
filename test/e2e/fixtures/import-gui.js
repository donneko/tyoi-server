import { Server } from "@donneko/tyoi-server";
import WebSocket from "ws";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    browser: false,
    signalClose: false,
    gui: true,
});

try {
    await server.start();
    const port = server.getPort();
    const origin = `http://127.0.0.1:${port}`;

    const guiResponse = await fetch(`${origin}/__tyoi/`);
    if (!guiResponse.ok || !guiResponse.headers.get("content-type")?.includes("text/html")) {
        throw new Error(
            `GUI response was not HTML: ${guiResponse.status} ${guiResponse.headers.get("content-type")}`
        );
    }

    const statusResponse = await fetch(`${origin}/__tyoi/api/status`);
    const status = await statusResponse.json();
    if (!statusResponse.ok || status.state !== "running" || status.port !== port) {
        throw new Error(`Unexpected GUI status response: ${JSON.stringify(status)}`);
    }

    const message = await getWebSocketMessage(`ws://127.0.0.1:${port}/__tyoi/ws`);
    if (message.type !== "snapshot" || message.status?.state !== "running") {
        throw new Error(`Unexpected GUI WebSocket message: ${JSON.stringify(message)}`);
    }
} finally {
    await server.stop();
}

function getWebSocketMessage(url) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);
        const timeout = setTimeout(() => {
            socket.terminate();
            reject(new Error("GUI WebSocket did not receive a snapshot"));
        }, 3_000);

        socket.once("message", (data) => {
            clearTimeout(timeout);
            socket.close();
            try {
                resolve(JSON.parse(data.toString()));
            } catch (error) {
                reject(error);
            }
        });
        socket.once("error", (error) => {
            clearTimeout(timeout);
            reject(error);
        });
    });
}
