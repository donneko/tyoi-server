import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    api: "/api",
});

server.onApi("GET:/get/a", () => {
    return "hello";
});
server.onApi("POST:/post/a", (data) => {
    if (typeof data.body === "object" && data.body && "post" in data.body) return data.body.post;
});

await server.start();
const port = server.getPort();

const res = async (url: string, init?: RequestInit | undefined): Promise<unknown> => {
    const response = await fetch(url, init);
    if (!(response.ok && response.status === 200)) throw new Error();

    const json = await response.json();
    return json;
};

await res(`http://localhost:${port}/api/get/a`).then((json) => {
    if (json !== "hello") throw new Error();
});

await res(`http://localhost:${port}/api/post/a`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: "hello" }),
}).then((json) => {
    if (json !== "hello") throw new Error(JSON.stringify(json));
});

await server.stop();
