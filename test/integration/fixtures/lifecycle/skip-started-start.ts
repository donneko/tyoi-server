import { Server } from "../../../../src/index.js";
const server = new Server({
    root: import.meta.dirname,
});

await server.start();
await server.start();

await server.stop();
