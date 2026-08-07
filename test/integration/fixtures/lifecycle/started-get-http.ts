import { Server } from "../../../../src/index.js";
import http from "node:http";

const server = new Server({
    root: import.meta.dirname,
});

await server.start();

const getHttpServer = server.getHttpServer();

if (!(getHttpServer instanceof http.Server)) throw new Error();

await server.stop();
