import { Server } from "@donneko/tyoi-server";
const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
});

await server.start();
const port = server.getPort();

// ポートにアクセスできるか？確認
const response = await fetch(`http://localhost:${port}/`);

if (!(!response.ok && [404, 200].includes(response.status)))
    throw new Error(`response.ok:${response.ok},response.status:${response.status}`);

await server.stop();

// signal が回収されているか？確認
const count = process.listenerCount("SIGINT") + process.listenerCount("SIGTERM");

if (count !== 0) throw new Error();
