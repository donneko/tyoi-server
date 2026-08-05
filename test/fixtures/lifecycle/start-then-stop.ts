import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: "",
    port: 0,
});

await server.start();
await server.stop();
