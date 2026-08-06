import { Server } from "@donneko/tyoi-server";

const server = new Server({
    baseDirname: import.meta.dirname,
    port: 0,
    apiPrefix: "/api",
});

server.onAPI("GET:/get/test", () => {
    return "hello";
});
server.onAPI("POST:/post/test", (data) => {
    if (typeof data.body === "object" && data.body && "post" in data.body) return data.body.post;
});
server.onAPI("GET:/get/error", () => {
    throw new Error();
});
server.onAPI("POST:/post/error", () => {
    throw new Error();
});

await server.start();
const port = server.getPort();
const base = `http://localhost:${port}`;
const postInit = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: "hello" }),
};

// api get
await res(`${base}/api/get/test`, [200]).then((json) => {
    if (!(json?.ok && json?.data === "hello"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

await res(`${base}/api/get/not-found`, [404]).then((json) => {
    if (!(!json?.ok && json?.code === "API_NOT_FOUND" && typeof json?.message === "string"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

await res(`${base}/api/get/error`, [500]).then((json) => {
    if (!(!json?.ok && json?.code === "API_INTERNAL_ERROR" && typeof json?.message === "string"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

// api post
await res(`${base}/api/post/test`, [200], postInit).then((json) => {
    if (!(json.ok && json.data === "hello"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

await res(`${base}/api/post/not-found`, [404], postInit).then((json) => {
    if (!(!json?.ok && json?.code === "API_NOT_FOUND" && typeof json?.message === "string"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

await res(`${base}/api/post/error`, [500], postInit).then((json) => {
    if (!(!json?.ok && json?.code === "API_INTERNAL_ERROR" && typeof json?.message === "string"))
        throw new Error(`json.ok: ${json.ok},json.data: ${json.data},json.code: ${json.code}`);
});

await server.stop();

async function res(url, status, init) {
    const response = await fetch(url, init);
    if (!status.includes(response.status))
        throw new Error(`response.ok:${response.ok},response.status:${response.status}`);
    const json = await response.json();
    return json;
}
