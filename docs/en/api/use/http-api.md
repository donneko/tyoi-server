# Build an HTTP API

## Minimal example

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
});

app.get("/status", ({ query }) => ({
    service: "example",
    query,
}));

app.post("/messages", ({ body, headers }) => ({
    received: body,
    contentType: headers["content-type"],
}));

await app.start();
```

The default `api` is `/api`, so the endpoints are `GET /api/status` and `POST /api/messages`.

## Send requests

```bash
curl "http://localhost:3000/api/status?detail=true"
curl -X POST http://localhost:3000/api/messages \
  -H "content-type: application/json" \
  -d '{"text":"hello"}'
```

On success, the handler result is returned in `data`.

```json
{
  "ok": true,
  "data": {
    "received": { "text": "hello" },
    "contentType": "application/json"
  }
}
```

## Asynchronous handlers

A handler may return a value or a Promise.

```ts
app.get("/users", async () => {
    const users = await loadUsers();
    return { users };
});
```

## Manage APIs directly

Use the `server` property returned by `tyoi()` to inspect, remove, register one-time handlers, or execute handlers without HTTP.

```ts
const unsubscribe = app.server.onApi("GET:/health", () => ({ status: "ok" }));

console.log(app.server.hasApi("GET:/health"));

const result = await app.server.emitApi("GET:/health", {
    query: {},
    body: undefined,
    headers: {},
});

unsubscribe();
```

`emitApi()` executes only the registered handler and does not add the HTTP `{ ok, data }` response wrapper.
