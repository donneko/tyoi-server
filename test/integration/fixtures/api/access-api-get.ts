import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    api: "/api",
});

server.onApi("GET:/a", () => {
    return "hello";
});

await server.start();
const port = server.getPort();

const response = await fetch(`http://localhost:${port}/api/a`);
if (!(response.ok && response.status === 200))
    throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
const json = await response.json();
if (json !== "hello") throw new Error(JSON.stringify(json));

await server.stop();
