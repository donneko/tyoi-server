# Built-in management GUI

The built-in management GUI lets you inspect the public configuration, runtime status, and recent server logs of a running tyoi-server instance. It is read-only and does not provide controls for changing configuration or stopping the server.

## Enable local access

The default value of `gui` is `false`. Enable it as follows:

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    port: 3000,
    gui: true,
});

await app.start();
```

After startup, open `http://127.0.0.1:3000/__tyoi/`. When using `port: 0` or `autoPort: true`, append `/__tyoi/` to the actual Local URL shown at startup.

`gui: true` is equivalent to `gui: { allowLan: false }`. HTTP and WebSocket peers are checked using the real socket address, and only IPv4 or IPv6 loopback connections are accepted. Forwarded headers from a proxy are not used for this decision.

## Screens

| Screen | Content |
| --- | --- |
| Summary | Public server settings such as `root`, `public`, `api`, port, and LAN options |
| Status | Runtime state, actual port, uptime, and last update time |
| Live Log | The latest 30 server-event log entries, newest first |

The browser reads the management APIs from the same origin and automatically reconnects if the WebSocket connection is interrupted. Astro is used only to build static assets and is not a runtime dependency of the published package.

## Allow LAN access

LAN access requires both LAN listening for the server and LAN access for the GUI.

```ts
const app = tyoi({
    root: import.meta.dirname,
    port: 3000,
    lan: true,
    gui: { allowLan: true },
});
```

::: danger There is no authentication
With `allowLan: true`, everyone who can reach the server can read project paths, public configuration, runtime status, and logs. Do not expose it directly to the internet, and use it only on a trusted network.
:::

Setting only `lan: true` does not permit LAN access to the GUI. Conversely, setting only `allowLan: true` still leaves the server listening on loopback, so LAN clients cannot connect.

## Reserved endpoints

When the GUI is enabled, these paths are handled before user-defined `api` routes and static file serving.

| Kind | Path | Content |
| --- | --- | --- |
| GUI | `GET /__tyoi/` | Management interface |
| Management API | `GET /__tyoi/api/summary` | Public server configuration |
| Management API | `GET /__tyoi/api/status` | Runtime state, actual port, and uptime |
| Management API | `GET /__tyoi/api/log` | Latest 30 log entries |
| WebSocket | `WS /__tyoi/ws` | Initial snapshot followed by new log entries |

The WebSocket sends one `snapshot` message when a client connects, then sends a `log` message for each new log entry. These are internal tyoi-server management endpoints and cannot be replaced by user HTTP API or WebSocket handlers.

First path segments beginning with `__tyoi` are reserved, including for future internal features. Do not use them for application APIs, WebSockets, or public files.

## Disable the GUI

Set `gui: false` or omit `gui` to leave the management interface, APIs, and WebSocket unregistered. Existing application behavior remains unchanged.
