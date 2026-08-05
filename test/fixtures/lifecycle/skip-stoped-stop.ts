import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
});

await server.stop();
