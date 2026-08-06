import { Server } from "../../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    publicDirname: "./test-data",
    port: 0,
});

await server.start();
const port = server.getPort();

await res(`http://localhost:${port}/`);

await server.stop();

async function res(url: string, init?: RequestInit | undefined): Promise<void> {
    const response = await fetch(url, init);
    if (!(response.ok && [200].includes(response.status))) throw new Error();
}
