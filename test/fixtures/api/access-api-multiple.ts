import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "api",
});

server.onAPI("GET:/get/a", () => {
    return "hello";
});
server.onAPI("POST:/post/a", (data) => {
    return data.body;
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
    body: JSON.stringify({ post: "hello" }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}).then((json: any) => {
    if (!(json?.ok && json?.data.post === "hello")) throw new Error();
});

await server.stop();
