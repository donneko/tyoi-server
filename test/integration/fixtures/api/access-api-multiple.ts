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

const res = async (url: string, init?: RequestInit | undefined): Promise<object> => {
    const response = await fetch(url, init);
    if (!(response.ok && [404, 200].includes(response.status))) throw new Error();

    const json = await response.json();
    return json;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
await res(`http://localhost:${port}/api/get/a`).then((json: any) => {
    if (!(json?.ok && json?.data === "hello")) throw new Error();
});

await res(`http://localhost:${port}/api/post/a`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: "hello" }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}).then((json: any) => {
    if (!(json.ok && json.data === "hello"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data}`);
});

await server.stop();
