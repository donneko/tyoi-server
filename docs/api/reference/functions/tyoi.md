[@donneko/tyoi-server](../index.md) / tyoi

# 関数: tyoi()

> **tyoi**\<`RequestNameList`, `WebSocketNameList`\>(`options`): [`ShortHandler`](../classes/ShortHandler.md)\<`RequestNameList`, `WebSocketNameList`\>

定義: [short-handler/short-handler.ts:107](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L107)

API と WebSocket の登録を簡潔に行うサーバーを作成します。
Creates a server with a compact API for registering HTTP and WebSocket handlers.

## 型パラメーター

### RequestNameList

`RequestNameList` *extends* `string` = `string`

登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.

### WebSocketNameList

`WebSocketNameList` *extends* `string` = `string`

登録できる WebSocket パス。 / WebSocket paths that can be registered.

## パラメータ

### options

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。`root` は必須です。 / Server options. `root` is required.

## 戻り値

[`ShortHandler`](../classes/ShortHandler.md)\<`RequestNameList`, `WebSocketNameList`\>

API 登録・起動・停止を行う簡易 API。 / A compact API for registration, startup, and shutdown.

## 例

```ts
type ApiKeys = "GET:/health";
type WebSocketKeys = "/events";

const app = tyoi<ApiKeys, WebSocketKeys>({
  root: import.meta.dirname,
  public: "../public/main",
});

app.get("/health", () => ({ status: "ok" }));
await app.start();
```
