# Configuration options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `baseDirname` | `string` | None | Base for relative paths. Required for programmatic use and set automatically by the CLI |
| `publicDirname` | `string` | `"../public/main"` | Static file directory, as an absolute path or relative to `baseDirname` |
| `apiPrefix` | `string` | `"/api"` | Path where the HTTP API is mounted |
| `port` | `number` | `3000` | Listening port. With `0`, the OS assigns an available port |
| `middlewares` | `express.RequestHandler[]` | `[]` | Express middleware added before APIs and static file serving |
| `exposeLan` | `boolean` | `false` | Listens on `0.0.0.0` when `true`, or `127.0.0.1` when `false` |
| `showQrCode` | `boolean` | `false` | Displays a QR code for the network URL in the terminal |
| `openBrowser` | `boolean \| "local" \| "network"` | `false` | URL to open after startup. `true` is the same as `"local"` |
| `autoPort` | `boolean` | `false` | Increments the port until an available one is found when the requested port is in use |
| `signalShutdownHandling` | `boolean` | `true` | Runs shutdown handling on `SIGINT` / `SIGTERM` |
| `language` | `string` | `"ja-JP"` | Language for server and CLI messages |

## `openBrowser`

| Value | Behavior |
| --- | --- |
| `false` | Does not open a browser |
| `true` | Opens the local URL |
| `"local"` | Opens the local URL |
| `"network"` | Opens the network URL when `exposeLan: true`; otherwise warns and opens the local URL |

## `autoPort`

When the requested port is in use and `autoPort: true`, the server increments the port number until one is available. When it is `false`, the CLI asks whether to use the next port and startup fails if you decline.

After startup, `getPort()` returns the port that is actually in use.

## Validation

`defineConfig()` validates the configuration with a Zod schema and throws a `ZodError` for an invalid type.
