import { Server } from "../../../../src/index.js";
const server = new Server({
    root: import.meta.dirname,
    port: 0,
});

server.onEvent("server/log:*", (e) => {
    if (typeof e === "object") process.exit(0);
});

await server.start();
