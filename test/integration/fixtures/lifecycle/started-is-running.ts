import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
});

await server.start();

const isRunning = server.isRunning();

if (!isRunning) throw new Error();

await server.stop();
