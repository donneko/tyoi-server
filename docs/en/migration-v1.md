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

## HTTP API responses

Successful HTTP API responses now return the handler result directly. The `ok` property was also removed from unregistered API and handler error responses.

| v0.0.8 | v1.0.0 |
| --- | --- |
| `{ "ok": true, "data": <handler result> }` | `<handler result>` |
| `{ "ok": false, "code": "API_NOT_FOUND", "message": ... }` | `{ "code": "API_NOT_FOUND", "message": ... }` |
| `{ "ok": false, "code": "API_INTERNAL_ERROR", "message": ... }` | `{ "code": "API_INTERNAL_ERROR", "message": ... }` |

Clients using `fetch()` should check `Response.ok` and use `json` itself as the result instead of the previous `json.data`.

```ts
const response = await fetch(url);
const json = await response.json();

if (!response.ok) {
    throw new Error(`${json.code}: ${json.message}`);
}

console.log(json);
```

`ShortHandler` and `tyoi()` now accept typed registration keys in the same `"METHOD:/path"` format as `Server`. Existing code that omits the type arguments does not need to change.

## Events

The log event name changed as follows:

```text
server/*:log -> server/log:*
```

## CLI

`tyoi dev` was removed. The generated project's `npm run dev` and `tyoi run` commands remain available.

Use `--template` or `-t` to select a template, `--port` or `-p` to select a port, and `--open` or `-o` to open a browser.
