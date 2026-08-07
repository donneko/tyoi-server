import { Server } from "../../../../src/index.js";
const server = new Server({
    root: import.meta.dirname,
    port: 0,
});

await server.start();
const port = server.getPort();

const response = await fetch(`http://localhost:${port}/`);

if (!(!response.ok && [404, 200].includes(response.status)))
    throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
await server.stop();
