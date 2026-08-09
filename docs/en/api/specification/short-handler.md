# `tyoi()` and `ShortHandler`

`tyoi(options)` creates an internal `Server` and returns a `ShortHandler` containing the most commonly used operations.

## `tyoi(options)`

```ts
function tyoi<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
>(options: ServerOptions): ShortHandler<RequestNameList, WebSocketNameList>;
```

When used programmatically, `options.root` is required. In most cases, pass `import.meta.dirname`.

When you provide a union in the same `"METHOD:/path"` format used by `Server`, `get()` and `post()` accept only paths for the corresponding method. Provide WebSocket paths as the second type argument.

```ts
type ApiKeys = "GET:/health" | "POST:/users";
type WebSocketKeys = "/events";

const app = tyoi<ApiKeys, WebSocketKeys>({
    root: import.meta.dirname,
});

app.get("/health", () => ({ status: "ok" }));
app.post("/users", ({ body }) => ({ body }));
app.ws("/events", ({ ws }) => ws.send("ready"));
```

When the type arguments are omitted, any string can be registered as before. Typed keys constrain only registration paths; they do not type request bodies or handler return values.

## `ShortHandler`

| Member | Description | Return value |
| --- | --- | --- |
| `server` | Gets the internal `Server` with the same type arguments | `Server<RequestNameList, WebSocketNameList>` |
| `get(path, handler)` | Registers a GET API | `this` |
| `post(path, handler)` | Registers a POST API | `this` |
| `ws(path, handler)` | Registers a WebSocket handler | `this` |
| `start(options?)` | Starts the server | `Promise<http.Server \| undefined>` |
| `listen(options?)` | Alias for `start()` | Same as above |
| `close()` | Stops the server | `Promise<void>` |
| `stop()` | Alias for `close()` | Same as above |

`get()`, `post()`, and `ws()` return `this`, so they can be chained.

```ts
app
    .get("/health", () => ({ status: "ok" }))
    .post("/users", () => ({ created: true }))
    .ws("/events", ({ ws }) => ws.send("ready"));
```

Registering the same method and path, or the same WebSocket path, replaces the previous handler.
