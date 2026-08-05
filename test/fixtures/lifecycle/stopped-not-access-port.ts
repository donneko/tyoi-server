import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
});

await server.start();

const port = server.getPort();

await server.stop();

await res(`http://localhost:${port}/`, { signal: AbortSignal.timeout(2000) }).catch(e=>{
    if(e.name !== "TimeoutError")throw e;
});


async function res (url: string, init?: RequestInit | undefined): Promise<void>{
    const response = await fetch(url, init);
    if (!(response.ok && [404,200].includes(response.status))) throw new Error();

};