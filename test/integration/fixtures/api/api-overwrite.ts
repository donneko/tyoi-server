import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    api: "/api",
});

server.onApi("GET:/get/a", () => {
    return "hello";
});
server.onApi("GET:/get/a", () => {
    return "the hello";
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
    if (json !== "the hello") throw new Error(JSON.stringify(json));
});

await server.stop();
