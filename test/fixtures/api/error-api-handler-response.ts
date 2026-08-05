import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "/api",
});

server.onAPI("GET:/get/a", () => {
    throw new Error();
});

await server.start();
const port = server.getPort();

const res = async (url: string, init?: RequestInit | undefined): Promise<object> => {
    const response = await fetch(url, init);
    if (!(!response.ok && [500].includes(response.status)))
        throw new Error(`response.ok:${response.ok},response.status:${response.status}`);

    const json = await response.json();
    return json;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
await res(`http://localhost:${port}/api/get/a`).then((json: any) => {
    if (!(!json?.ok && json?.code === "API_INTERNAL_ERROR" && typeof json?.message === "string"))
        throw new Error();
});

await server.stop();
