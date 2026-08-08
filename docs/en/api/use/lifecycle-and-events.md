# Lifecycle and events

## Inspect the running server

```ts
const httpServer = await app.start();

console.log(app.server.isRunning());
console.log(app.server.getPort());
console.log(app.server.getHttpServer() === httpServer);
console.log(app.server.getConfig("api"));
```

When using `autoPort` or port `0`, `getPort()` returns the actual assigned port.

## Stop the server

```ts
await app.close();
```

`listen()` is an alias for `start()`, and `stop()` is an alias for `close()`. Active WebSocket connections are also closed during shutdown.

## Subscribe to log events

```ts
const onLog = (data) => {
    if (data) console.log(data.type, data.message);
};

const unsubscribe = app.server.onEvent("server/log:*", onLog);

app.server.onceEvent("server/log:*", (data) => {
    console.log("first log", data?.message);
});

console.log(app.server.hasEvent("server/log:*"));
unsubscribe();
```

When calling `offEvent()` directly, pass the same function used during registration.

```ts
app.server.offEvent("server/log:*", onLog);
```
