# HTTP and WebSocket protocol

## HTTP API

API keys use the `${method}:${path}` format. `app.get("/health")` registers `GET:/health`, and `app.post("/items")` registers `POST:/items`.

Registration paths should start with `/` and must exactly match the request pathname. Path parameter expansion such as `/:id` is not supported.

When `apiPrefix` is `/api`, the corresponding HTTP path is `/api/health`.

### Handler input

```ts
type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
};
```

JSON request bodies are parsed by Express `express.json()`.

### Responses

| State | HTTP status | Body |
| --- | --- | --- |
| Success | `200` | `{ "ok": true, "data": <handler result> }` |
| Unregistered API | `404` | `{ "ok": false, "code": "API_NOT_FOUND", "message": <localized message> }` |
| Handler error | `500` | `{ "ok": false, "code": "API_INTERNAL_ERROR", "message": <localized message> }` |

There is no API for directly setting an HTTP status or response headers from a handler. Add Express middleware through `middlewares` when that control is required.

## WebSocket

- Upgrades are handled on the same server and port as HTTP.
- The URL pathname is compared exactly with the registered path. The query string is not part of the comparison.
- Upgrade sockets for unregistered paths are destroyed.
- If a handler rejects or throws, the connection is closed with code `1011` and reason `WebSocket handler failed`.
- During server shutdown, connections are closed with code `1001` and reason `Server shutting down`. Connections still open after 3 seconds are terminated.

## Middleware order

Requests are processed in this order:

1. Custom middleware specified in `middlewares`
2. `express.json()`
3. API processing under `apiPrefix`
4. Static file delivery through `express.static()`
5. HTML 404 response for static files
