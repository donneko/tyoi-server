# `Server` の仕様

`Server` は API、WebSocket、イベント、設定、ライフサイクルへ直接アクセスするための低レベル API です。

```ts
class Server<RequestNameList extends string = string, WebSocketNameList extends string = string>
```

## 型付きの登録キー

```ts
type API = "GET:/health" | "POST:/messages";
type WS = "/ws";

const server = new Server<API, WS>({
    root: import.meta.dirname,
    public: "../public/main",
});
```

## ライフサイクル

| メソッド | 仕様 |
| --- | --- |
| `start(options?)` | 起動し、Node.js の `http.Server` を返す。起動済み・起動処理中なら警告して `undefined` を返す |
| `listen(options?)` | `start()` のエイリアス |
| `stop()` | WebSocket と HTTP サーバーを停止。停止済み・停止処理中なら何もしない |
| `close()` | `stop()` のエイリアス |
| `isRunning()` | 管理中の HTTP サーバーがあるかを返す |
| `getPort()` | 現在の設定上のポートを返す。起動後は実際の待受ポートに更新される |
| `getHttpServer()` | HTTP サーバーを返す。未起動・停止後は `null` |
| `getConfig(key)` | 解決済みの設定値を返す |

`signalClose` が `true` の場合、起動時に `SIGINT` と `SIGTERM` の停止ハンドラーを登録し、停止時に解除します。

停止処理では idle HTTP 接続を閉じ、10 秒以内に終了しない接続は `closeAllConnections()` で終了します。WebSocket は先に close code `1001` で閉じ、3 秒後も残るクライアントを強制終了します。

## API レジストリ

| メソッド | 仕様 |
| --- | --- |
| `onApi(key, handler)` | ハンドラーを登録し、解除関数を返す |
| `onceApi(key, handler)` | 最初の実行前に登録を解除するハンドラーを登録 |
| `offApi(key)` | 登録を解除 |
| `hasApi(key)` | 登録済みか確認 |
| `emitApi(key, data)` | ハンドラーを直接実行し、結果を Promise で返す |

API レジストリは 1 キーにつき 1 ハンドラーです。再登録は上書きになります。

## WebSocket レジストリ

`onWebSocket`、`onceWebSocket`、`offWebSocket`、`hasWebSocket` を使用します。API レジストリと同様に、1 パスにつき 1 ハンドラーです。

## イベント

公開イベントは現在 `server/log:*` です。`onEvent` と `onceEvent` は解除関数を返し、同じイベントへ複数のリスナーを登録できます。`offEvent(event, handler)` は指定したリスナーだけを解除します。
