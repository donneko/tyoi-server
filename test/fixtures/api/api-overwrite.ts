import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "/api",
});

server.onAPI("GET:/get/a", () => {
    return "hello";
});
server.onAPI("GET:/get/a", () => {
    return "the hello";
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
    if (!(json?.ok && json?.data === "the hello")) throw new Error(JSON.stringify(json));
});

await server.stop();
