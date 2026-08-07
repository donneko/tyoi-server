import { Server } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    qr: true,
});

await server.start({
    qr: false,
});

const qr = server.getConfig("qr");

if (qr) throw new Error();

await server.stop();
