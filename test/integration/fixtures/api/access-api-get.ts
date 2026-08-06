import { Server } from "../../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "/api",
});

server.onAPI("GET:/a", () => {
    return "hello";
});

await server.start();
const port = server.getPort();

const response = await fetch(`http://localhost:${port}/api/a`);
if (!(response.ok && [404, 200].includes(response.status)))
    throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
const json = await response.json();
if (!(json.ok && json.data === "hello")) throw new Error(JSON.stringify(json));

await server.stop();
