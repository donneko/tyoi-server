[@donneko/tyoi-server](../index.md) / tyoi

# Function: tyoi()

> **tyoi**(`options`): [`ShortHandler`](../classes/ShortHandler.md)

Defined in: [short-handler/short-handler.ts:77](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L77)

API と WebSocket の登録を簡潔に行うサーバーを作成します。

## Parameters

### options

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。`baseDirname` は必須です。

## Returns

[`ShortHandler`](../classes/ShortHandler.md)

API 登録・起動・停止を行う簡易 API。

## Example

```ts
const app = tyoi({
  baseDirname: import.meta.dirname,
  publicDirname: "../public/main",
});

app.get("/health", () => ({ ok: true }));
await app.start();
```
