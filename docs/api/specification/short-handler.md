# `tyoi()` と `ShortHandler` の仕様

`tyoi(options)` は内部で `Server` を生成し、よく使う操作をまとめた `ShortHandler` を返します。

## `tyoi(options)`

```ts
function tyoi(options: ServerOptions): ShortHandler;
```

プログラムから使用する場合、`options.root` は必須です。通常は `import.meta.dirname` を指定します。

## `ShortHandler`

| メンバー | 説明 | 戻り値 |
| --- | --- | --- |
| `server` | 内部の `Server` を取得 | `Server` |
| `get(path, handler)` | GET API を登録 | `this` |
| `post(path, handler)` | POST API を登録 | `this` |
| `ws(path, handler)` | WebSocket ハンドラーを登録 | `this` |
| `start(options?)` | サーバーを起動 | `Promise<http.Server \| undefined>` |
| `listen(options?)` | `start()` のエイリアス | 同上 |
| `close()` | サーバーを停止 | `Promise<void>` |
| `stop()` | `close()` のエイリアス | 同上 |

`get()`、`post()`、`ws()` は `this` を返すため、チェーンできます。

```ts
app
    .get("/a", () => "a")
    .post("/b", () => "b")
    .ws("/ws", ({ ws }) => ws.send("ready"));
```

同じメソッド・パスの API、または同じ WebSocket パスを再登録すると、以前のハンドラーは上書きされます。
