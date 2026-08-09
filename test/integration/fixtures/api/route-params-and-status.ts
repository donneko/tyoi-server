import { Server, apiResponse } from "../../../../src/index.js";

const server = new Server({
    root: import.meta.dirname,
    port: 0,
    api: "/api",
});

server.onApi("GET:/users/:id", ({ params }) => ({ route: "parameter", params }));
server.onApi("GET:/users/me", () => ({ route: "static" }));
server.onApi("GET:/files/*splat", ({ params }) => params);
server.onApi("GET:/reports{/:year}", ({ params }) => params);
server.onApi("POST:/users", () => apiResponse({ id: 1 }, { status: 201 }));
server.onApi("DELETE:/users/:id", () => apiResponse(undefined, { status: 204 }));

await server.start();
const base = `http://localhost:${server.getPort()}/api`;

const parameter = await fetch(`${base}/users/a%20b`);
if (parameter.status !== 200) throw new Error(`parameter status:${parameter.status}`);
const parameterBody = await parameter.json();
if (parameterBody.params.id !== "a b") throw new Error(JSON.stringify(parameterBody));

const staticRoute = await fetch(`${base}/users/me`);
const staticBody = await staticRoute.json();
if (staticBody.route !== "static") throw new Error(JSON.stringify(staticBody));

const wildcard = await fetch(`${base}/files/a/b`);
const wildcardBody = await wildcard.json();
if (JSON.stringify(wildcardBody.splat) !== JSON.stringify(["a", "b"]))
    throw new Error(JSON.stringify(wildcardBody));

const optional = await fetch(`${base}/reports`);
if (JSON.stringify(await optional.json()) !== "{}") throw new Error("optional params failed");

const created = await fetch(`${base}/users`, { method: "POST" });
if (created.status !== 201) throw new Error(`created status:${created.status}`);
if ((await created.json()).id !== 1) throw new Error("created body failed");

const noContent = await fetch(`${base}/users/1`, { method: "DELETE" });
if (noContent.status !== 204 || (await noContent.text()) !== "")
    throw new Error(`no content status:${noContent.status}`);

const methodNotAllowed = await fetch(`${base}/users/1`, { method: "PATCH" });
if (methodNotAllowed.status !== 405) throw new Error(`method status:${methodNotAllowed.status}`);
if (methodNotAllowed.headers.get("allow") !== "GET, DELETE")
    throw new Error(`allow:${methodNotAllowed.headers.get("allow")}`);
if ((await methodNotAllowed.json()).code !== "API_METHOD_NOT_ALLOWED")
    throw new Error("method body failed");

await server.stop();
