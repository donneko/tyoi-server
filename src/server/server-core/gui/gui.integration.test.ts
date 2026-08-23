import { afterEach, describe, expect, it } from "vitest";
import { WebSocket } from "ws";
import { Server } from "../app/server.js";

const servers: Server[] = [];

async function startServer(gui: boolean | { allowLan?: boolean }) {
    const server = new Server({
        root: import.meta.dirname,
        public: ".",
        port: 0,
        browser: false,
        signalClose: false,
        gui,
    });
    servers.push(server);
    await server.start();
    return server;
}

afterEach(async () => {
    await Promise.all(servers.splice(0).map((server) => server.stop()));
});

describe("built-in GUI", () => {
    it("does not expose management APIs when disabled", async () => {
        const server = await startServer(false);
        const response = await fetch(`http://127.0.0.1:${server.getPort()}/__tyoi/api/status`);
        expect(response.status).toBe(404);
    });

    it("serves summary, status, and log APIs without using the public API prefix", async () => {
        const server = await startServer(true);
        const origin = `http://127.0.0.1:${server.getPort()}`;

        const summary = await fetch(`${origin}/__tyoi/api/summary`).then((response) =>
            response.json()
        );
        const status = await fetch(`${origin}/__tyoi/api/status`).then((response) =>
            response.json()
        );
        const log = await fetch(`${origin}/__tyoi/api/log`).then((response) => response.json());

        expect(summary).toMatchObject({ api: "/api", port: server.getPort(), gui: true });
        expect(status).toMatchObject({ state: "running", port: server.getPort() });
        expect(log.logs).toBeInstanceOf(Array);
    });

    it("keeps the reserved WebSocket route separate from public handlers", async () => {
        const server = await startServer(true);
        server.onWebSocket("/__tyoi/ws", ({ ws }) => ws.send("public-handler"));

        const message = await new Promise<string>((resolve, reject) => {
            const socket = new WebSocket(`ws://127.0.0.1:${server.getPort()}/__tyoi/ws`);
            socket.once("message", (data) => {
                resolve(String(data));
                socket.close();
            });
            socket.once("error", reject);
        });

        expect(JSON.parse(message)).toMatchObject({ type: "snapshot" });
    });
});
