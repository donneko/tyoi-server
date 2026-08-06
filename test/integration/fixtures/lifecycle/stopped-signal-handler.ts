import { Server } from "../../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
});

await server.start();

await server.stop();

const count = process.listenerCount("SIGINT") + process.listenerCount("SIGTERM");

if (count !== 0) throw new Error();
