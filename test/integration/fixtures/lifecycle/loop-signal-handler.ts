import { Server } from "../../../../src/index.js";
const server = new Server({
    baseDirname: import.meta.dirname,
});

const fn = async () => {
    await server.start();
    await server.stop();
};
const loop = Array(10).fill(fn);

await Promise.all(loop);

const count = process.listenerCount("SIGINT") + process.listenerCount("SIGTERM");

if (count !== 0) throw new Error();
