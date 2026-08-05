import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "api",
});

server.onAPI("POST:/post/a", (data) => {
    return data.body;
});

await server.start();
const port = server.getPort();

const response = await fetch(`http://localhost:${port}/api/post/a`, {
    method: "POST",
    body: JSON.stringify({ post: "hello" }),
});
if (!(response.ok && [404, 200].includes(response.status))) throw new Error();

const json = await response.json();
if (!(json.ok && json.data.post === "hello")) throw new Error();

await server.stop();
