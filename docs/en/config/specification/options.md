# Configuration options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | `string` | None | Base for relative paths. Required for programmatic use and set automatically by the CLI |
| `public` | `string` | `"../public/main"` | Static file directory, as an absolute path or relative to `root` |
| `api` | `string` | `"/api"` | Path where the HTTP API is mounted |
| `port` | `number` | `3000` | Integer from 0 to 65535. With `0`, the OS assigns an available port |
| `middlewares` | `express.RequestHandler[]` | `[]` | Express middleware added before APIs and static file serving |
| `lan` | `boolean` | `false` | Listens on `0.0.0.0` when `true`, or `127.0.0.1` when `false` |
| `qr` | `boolean` | `false` | Displays a QR code for the network URL in the terminal |
| `browser` | `boolean \| "local" \| "lan"` | `false` | URL to open after startup. `true` is the same as `"local"` |
| `autoPort` | `boolean` | `false` | Increments the port until an available one is found when the requested port is in use |
| `signalClose` | `boolean` | `true` | Runs shutdown handling on `SIGINT` / `SIGTERM` |
| `language` | `string` | `"ja-JP"` | Language for server and CLI messages |
| `gui` | `boolean \| { allowLan?: boolean }` | `false` | Serves the built-in management GUI at `/__tyoi/` |

## `browser`

| Value | Behavior |
| --- | --- |
| `false` | Does not open a browser |
| `true` | Opens the local URL |
| `"local"` | Opens the local URL |
| `"lan"` | Opens the network URL when `lan: true`; otherwise warns and opens the local URL |

## `autoPort`

When the requested port is in use and `autoPort: true`, the server increments the port number until one is available. When it is `false`, the CLI asks whether to use the next port and startup fails if you decline.

After startup, `getPort()` returns the port that is actually in use.

## `gui`

Set `gui: true` to view Summary, Status, and Live Log at `/__tyoi/` on the same server. The management APIs use `/__tyoi/api/*` and real-time logs use `/__tyoi/ws`, independently of the public `api` setting.

Only loopback connections are allowed by default. `gui: { allowLan: true }` permits LAN access, but exposes project paths, configuration, and logs without authentication. Enable it only on a trusted network.

## Validation

`defineConfig()` validates the configuration with a Zod schema and throws a `ZodError` for an invalid type, range, or unknown property. Unknown properties are also TypeScript errors.
