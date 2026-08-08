# v1.0.0 Migration Guide

v1.0.0 includes breaking changes from v0.0.8.

## Configuration

| v0.0.8 | v1.0.0 |
| --- | --- |
| `baseDirname` | `root` |
| `publicDirname` | `public` |
| `apiPrefix` | `api` |
| `exposeLan` | `lan` |
| `showQrCode` | `qr` |
| `openBrowser` | `browser` |
| `signalShutdownHandling` | `signalClose` |

Change `openBrowser: "network"` to `browser: "lan"`.

## API methods

| v0.0.8 | v1.0.0 |
| --- | --- |
| `onAPI` | `onApi` |
| `onceAPI` | `onceApi` |
| `offAPI` | `offApi` |
| `hasAPI` | `hasApi` |
| `emitAPI` | `emitApi` |
| `ApiRegistry` | `HandlerRegistry` |
| `ApiRegistryHandler` | `Handler` |

The names `Server` and `tyoi` have not changed.

## Events

The log event name changed as follows:

```text
server/*:log -> server/log:*
```

## CLI

`tyoi dev` was removed. The generated project's `npm run dev` and `tyoi run` commands remain available.

Use `--template` or `-t` to select a template, `--port` or `-p` to select a port, and `--open` or `-o` to open a browser.
