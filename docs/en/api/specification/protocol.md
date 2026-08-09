# HTTP and WebSocket protocol

## HTTP API

API keys use `${method}:${path}`. `app.get("/health")` registers `GET:/health`, and `app.post("/items")` registers `POST:/items`.

Registration paths start with `/` and accept the Express 5 `path-to-regexp` v8 syntax, including named parameters (`/users/:id`), wildcards (`/files/*splat`), and optional groups (`/reports{/:year}`).

An exact static route always wins. Dynamic routes prefer more literal text, fewer wildcards, and fewer optional groups; ties use registration order. Invalid patterns throw during registration.

When `api` is `/api`, the HTTP path is `/api/health`.

### Handler input

```ts
type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
    params?: Readonly<Record<string, string | string[]>>;
};
```

HTTP calls always provide `params`. Named parameters are decoded strings, wildcards are string arrays, and omitted parameters have no key. The property remains optional for backward compatibility with manual `emitApi()` calls. JSON bodies are parsed by Express `express.json()`.

### Responses

| State | HTTP status | Body |
| --- | --- | --- |
| Normal success | `200` | `<handler result>` |
| `apiResponse()` | specified status | specified body |
| Path match with wrong method | `405` | `{ "code": "API_METHOD_NOT_ALLOWED", "message": <localized message> }` |
| Unregistered API | `404` | `{ "code": "API_NOT_FOUND", "message": <localized message> }` |
| Handler or response error | `500` | `{ "code": "API_INTERNAL_ERROR", "message": <localized message> }` |

Successful responses have no framework-specific wrapper. Use `apiResponse()` to return an explicit status without colliding with ordinary JSON values.

```ts
import { apiResponse } from "@donneko/tyoi-server";

app.post("/users", () => apiResponse({ id: 1 }, { status: 201 }));
```

Like Express, status accepts integers from `100` through `999`. Express suppresses bodies for bodyless statuses such as `204` and `304`. Invalid statuses produce the existing `500` response.

When only the path matches, the server returns `405` and an `Allow` header containing registered methods. `HEAD` and `OPTIONS` are not added implicitly.

## WebSocket

- Upgrades are handled on the same HTTP server and port.
- The URL pathname is matched exactly. HTTP API route parameters do not apply to WebSocket paths.
- Upgrades for unregistered paths destroy the socket.
- If a handler rejects or throws, the connection closes with code `1011` and reason `WebSocket handler failed`.
- Server shutdown closes connections with code `1001` and reason `Server shutting down`; connections remaining after three seconds are terminated.

## Middleware order

1. Custom `middlewares`
2. `express.json()`
3. API handling under `api`
4. `express.static()`
5. Static HTML 404 response
