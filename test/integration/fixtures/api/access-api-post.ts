import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    api: "/api",
});

server.onApi("POST:/post/a", (data) => {
    if (typeof data.body === "object" && data.body && "post" in data.body) return data.body.post;
});

await server.start();
const port = server.getPort();

const response = await fetch(`http://localhost:${port}/api/post/a`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: "hello" }),
});
if (!(response.ok && [404, 200].includes(response.status)))
    throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
const json = await response.json();
if (!(json.ok && json.data === "hello"))
    throw new Error(`json.ok: ${json.ok},json.data: ${json.data}`);

await server.stop();
