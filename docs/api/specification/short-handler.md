# `tyoi()` と `ShortHandler` の仕様

`tyoi(options)` は内部で `Server` を生成し、よく使う操作をまとめた `ShortHandler` を返します。

## `tyoi(options)`

```ts
function tyoi<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
>(options: ServerOptions): ShortHandler<RequestNameList, WebSocketNameList>;
```

プログラムから使用する場合、`options.root` は必須です。通常は `import.meta.dirname` を指定します。

`Server` と同じ `"METHOD:/path"` 形式の union を指定すると、`get()` と `post()` は対応する method のパスだけを受け取ります。WebSocket パスは第2型引数で指定します。

```ts
type ApiKeys = "GET:/health" | "POST:/users";
type WebSocketKeys = "/events";

const app = tyoi<ApiKeys, WebSocketKeys>({
    root: import.meta.dirname,
});

app.get("/health", () => ({ status: "ok" }));
app.post("/users", ({ body }) => ({ body }));
app.ws("/events", ({ ws }) => ws.send("ready"));
```

型引数を省略した場合は、従来どおり任意の文字列を登録できます。型付きキーは登録パスだけを制約し、リクエスト本文やハンドラーの戻り値は型付けしません。

## `ShortHandler`

| メンバー | 説明 | 戻り値 |
| --- | --- | --- |
| `server` | 型引数を引き継いだ内部の `Server` を取得 | `Server<RequestNameList, WebSocketNameList>` |
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
