[@donneko/tyoi-server](../index.md) / tyoi

# 関数: tyoi()

> **tyoi**(`options`): [`ShortHandler`](../classes/ShortHandler.md)

定義: [short-handler/short-handler.ts:81](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L81)

API と WebSocket の登録を簡潔に行うサーバーを作成します。
Creates a server with a compact API for registering HTTP and WebSocket handlers.

## パラメータ

### options

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。`baseDirname` は必須です。 / Server options. `baseDirname` is required.

## 戻り値

[`ShortHandler`](../classes/ShortHandler.md)

API 登録・起動・停止を行う簡易 API。 / A compact API for registration, startup, and shutdown.

## 例

```ts
const app = tyoi({
  baseDirname: import.meta.dirname,
  publicDirname: "../public/main",
});

app.get("/health", () => ({ ok: true }));
await app.start();
```
