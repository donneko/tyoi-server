import { Server } from "../../../../src/index.js";
const server = new Server({
    root: import.meta.dirname,
});

await server.stop();
