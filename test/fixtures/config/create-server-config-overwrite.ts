import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    apiPrefix:"hogehoge"
});

const apiPrefix = server.getConfig("apiPrefix");

if(apiPrefix !== "hogehoge")throw new Error();

await server.stop();