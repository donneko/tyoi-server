# Practical recipes

## Serve an API and pages on the same port

```ts
const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    api: "/api",
});

app.get("/status", () => ({ ready: true }));
await app.start();
```

`public/main/index.html` is available at `/`, and the API is available at `/api/status`.

## Test from a smartphone

```ts
await app.start({
    lan: true,
    qr: true,
});
```

Scan the QR code with a device connected to the same LAN.

## Add shared request handling

```ts
const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    middlewares: [
        (req, res, next) => {
            const startedAt = Date.now();
            res.on("finish", () => console.log(req.method, req.url, Date.now() - startedAt));
            next();
        },
    ],
});
```

## Register methods other than GET and POST

`ShortHandler` provides shortcuts only for GET and POST, but its underlying `Server` can register a key for any HTTP method.

```ts
app.server.onApi("PUT:/items", ({ body }) => ({ updated: body }));
```

This example is invoked by `PUT /api/items`.

## Restrict route names with types

```ts
type API = "GET:/health" | "POST:/items";
type WS = "/events";

const server = new Server<API, WS>({
    root: import.meta.dirname,
    public: "../public/main",
});
```
