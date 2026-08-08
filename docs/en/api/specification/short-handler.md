# `tyoi()` and `ShortHandler`

`tyoi(options)` creates an internal `Server` and returns a `ShortHandler` containing the most commonly used operations.

## `tyoi(options)`

```ts
function tyoi(options: ServerOptions): ShortHandler;
```

When used programmatically, `options.root` is required. In most cases, pass `import.meta.dirname`.

## `ShortHandler`

| Member | Description | Return value |
| --- | --- | --- |
| `server` | Gets the internal `Server` | `Server` |
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
    .get("/a", () => "a")
    .post("/b", () => "b")
    .ws("/ws", ({ ws }) => ws.send("ready"));
```

Registering the same method and path, or the same WebSocket path, replaces the previous handler.
