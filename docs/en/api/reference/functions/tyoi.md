[@donneko/tyoi-server](../index.md) / tyoi

# Function: tyoi()

> **tyoi**(`options`): [`ShortHandler`](../classes/ShortHandler.md)

Defined in: [short-handler/short-handler.ts:81](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L81)

API と WebSocket の登録を簡潔に行うサーバーを作成します。
Creates a server with a compact API for registering HTTP and WebSocket handlers.

## Parameters

### options

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。`root` は必須です。 / Server options. `root` is required.

## Returns

[`ShortHandler`](../classes/ShortHandler.md)

API 登録・起動・停止を行う簡易 API。 / A compact API for registration, startup, and shutdown.

## Example

```ts
const app = tyoi({
  root: import.meta.dirname,
  public: "../public/main",
});

app.get("/health", () => ({ ok: true }));
await app.start();
```
