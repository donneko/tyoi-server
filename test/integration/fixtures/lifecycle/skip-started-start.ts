import { Server } from "../../../../src/index.js";
const server = new Server({
    baseDirname: import.meta.dirname,
});

await server.start();
await server.start();

await server.stop();
