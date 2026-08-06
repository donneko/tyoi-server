import { Server } from "@donneko/tyoi-server";

await checkNotFound();
await checkStatic();

async function checkNotFound() {
    const server = new Server({
        baseDirname: import.meta.dirname,
        port: 0,
    });

    await server.start();
    const port = server.getPort();

    const response = await fetch(`http://localhost:${port}/`);
    if (!(!response.ok && [404].includes(response.status)))
        throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
    await server.stop();
}

async function checkStatic() {
    const server = new Server({
        baseDirname: import.meta.dirname,
        publicDirname: "./test-data",
        port: 0,
    });

    await server.start();
    const port = server.getPort();

    const response = await fetch(`http://localhost:${port}/`);
    if (!(response.ok && [202].includes(response.status)))
        throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
    await server.stop();
}
