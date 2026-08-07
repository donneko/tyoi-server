import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    api: "hogehoge",
});

const api = server.getConfig("api");

if (api !== "hogehoge") throw new Error();

await server.stop();
