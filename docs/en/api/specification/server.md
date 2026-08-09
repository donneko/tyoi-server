# `Server` specification

`Server` is the low-level API for direct access to API handlers, WebSockets, events, configuration, and lifecycle operations.

```ts
class Server<RequestNameList extends string = string, WebSocketNameList extends string = string>
```

## Typed registration keys

```ts
type API = "GET:/health" | "POST:/messages";
type WS = "/ws";

const server = new Server<API, WS>({
    root: import.meta.dirname,
    public: "../public/main",
});
```

## Lifecycle

| Method | Behavior |
| --- | --- |
| `start(options?)` | Starts the server and returns the Node.js `http.Server`. Warns and returns `undefined` if already running or starting |
| `listen(options?)` | Alias for `start()` |
| `stop()` | Stops the WebSocket and HTTP servers. Does nothing if already stopped or stopping |
| `close()` | Alias for `stop()` |
| `isRunning()` | Returns whether an HTTP server is currently managed |
| `getPort()` | Returns the configured port. Updated to the actual listening port after startup |
| `getHttpServer()` | Returns the HTTP server, or `null` before startup and after shutdown |
| `getConfig(key)` | Returns a resolved configuration value |

When `signalClose` is `true`, handlers for `SIGINT` and `SIGTERM` are registered during startup and removed during shutdown.

Shutdown closes idle HTTP connections and calls `closeAllConnections()` for connections that remain after 10 seconds. WebSockets are closed first with code `1001`; clients still connected after 3 seconds are terminated.

## API registry

| Method | Behavior |
| --- | --- |
| `onApi(key, handler)` | Registers a handler and returns an unsubscribe function |
| `onceApi(key, handler)` | Registers a handler that removes itself before its first execution |
| `offApi(key)` | Removes a registration |
| `hasApi(key)` | Checks whether a handler is registered |
| `emitApi(key, data)` | Executes a handler directly and returns its result in a Promise |

The API registry stores one handler per key. Registering the same key again replaces the existing handler.

## WebSocket registry

Use `onWebSocket`, `onceWebSocket`, `offWebSocket`, and `hasWebSocket`. Like the API registry, it stores one handler per path.

## Events

The currently exposed event is `server/log:*`. `onEvent` and `onceEvent` return unsubscribe functions, and multiple listeners can be registered for the same event. `offEvent(event, handler)` removes only the specified listener.
