# HTTP と WebSocket の通信仕様

## HTTP API

API キーは `${method}:${path}` です。`app.get("/health")` は `GET:/health`、`app.post("/items")` は `POST:/items` として登録されます。

登録パスは `/` から始め、リクエストの pathname と完全一致させます。`/:id` のようなパスパラメーター展開は行いません。

`apiPrefix` が `/api` の場合、HTTP 上のパスは `/api/health` のようになります。

### ハンドラー入力

```ts
type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
};
```

JSON body は Express の `express.json()` で解析されます。

### レスポンス

| 状態 | HTTP status | body |
| --- | --- | --- |
| 成功 | `200` | `{ "ok": true, "data": <handler result> }` |
| 未登録 API | `404` | `{ "ok": false, "code": "API_NOT_FOUND", "message": <localized message> }` |
| ハンドラー例外 | `500` | `{ "ok": false, "code": "API_INTERNAL_ERROR", "message": <localized message> }` |

ハンドラーが返した HTTP status やヘッダーを直接指定する API はありません。必要な場合は `middlewares` で Express middleware を追加します。

## WebSocket

- HTTP と同じサーバー・ポートで upgrade を処理します。
- URL の pathname と登録パスを完全一致で照合します。query string は照合に含みません。
- 未登録パスへの upgrade はソケットを破棄します。
- ハンドラーが reject または throw した場合、接続を code `1011`、reason `WebSocket handler failed` で閉じます。
- サーバー停止時は code `1001`、reason `Server shutting down` で閉じます。3 秒後も残る接続は強制終了します。

## middleware の順序

処理順は次のとおりです。

1. `middlewares` で指定したカスタム middleware
2. `express.json()`
3. `apiPrefix` 配下の API 処理
4. `express.static()` による静的ファイル配信
5. 静的ファイル用の HTML 404 レスポンス
