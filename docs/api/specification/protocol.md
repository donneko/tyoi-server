# HTTP と WebSocket の通信仕様

## HTTP API

API キーは `${method}:${path}` です。`app.get("/health")` は `GET:/health`、`app.post("/items")` は `POST:/items` として登録されます。

登録パスは `/` から始めます。Express 5と同じ `path-to-regexp` v8構文を利用でき、名前付きパラメータ（`/users/:id`）、ワイルドカード（`/files/*splat`）、省略可能部分（`/reports{/:year}`）に対応します。

静的な完全一致が最優先です。動的ルート同士では、リテラル部分が多く、ワイルドカードと省略可能部分が少ないルートを優先し、同率の場合は登録順で解決します。不正なパターンは登録時に例外になります。

`api` が `/api` の場合、HTTP 上のパスは `/api/health` のようになります。

### ハンドラー入力

```ts
type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
    params?: Readonly<Record<string, string | string[]>>;
};
```

HTTP経由では `params` は常に渡されます。名前付きパラメータはデコード済み文字列、ワイルドカードは文字列配列になり、省略されたパラメータのキーは含まれません。`emitApi()` との後方互換性のため、型上は省略可能です。JSON body は Express の `express.json()` で解析されます。

### レスポンス

| 状態 | HTTP status | body |
| --- | --- | --- |
| 通常の成功 | `200` | `<handler result>` |
| `apiResponse()` | 指定したstatus | 指定したbody |
| パス一致・メソッド不一致 | `405` | `{ "code": "API_METHOD_NOT_ALLOWED", "message": <localized message> }` |
| 未登録 API | `404` | `{ "code": "API_NOT_FOUND", "message": <localized message> }` |
| ハンドラー・レスポンス処理例外 | `500` | `{ "code": "API_INTERNAL_ERROR", "message": <localized message> }` |

成功レスポンスにフレームワーク独自のラッパーは付きません。任意のstatusを返す場合は、通常JSONと衝突しない `apiResponse()` を使います。

```ts
import { apiResponse } from "@donneko/tyoi-server";

app.post("/users", () => apiResponse({ id: 1 }, { status: 201 }));
```

statusはExpressと同じ整数 `100`〜`999` が許可されます。`204`や`304`など本文を持たないstatusでは、Expressが本文を抑制します。無効なstatusは `500` になります。

パスだけが一致する場合は `405` と、登録済みメソッドを列挙した `Allow` ヘッダーを返します。`HEAD`や`OPTIONS`は暗黙には追加しません。

## WebSocket

- HTTP と同じサーバー・ポートで upgrade を処理します。
- URL の pathname と登録パスを完全一致で照合します。HTTP APIのルートパラメータ対応はWebSocketには適用されません。
- 未登録パスへの upgrade はソケットを破棄します。
- ハンドラーが reject または throw した場合、接続を code `1011`、reason `WebSocket handler failed` で閉じます。
- サーバー停止時は code `1001`、reason `Server shutting down` で閉じます。3 秒後も残る接続は強制終了します。

## middleware の順序

1. `middlewares` で指定したカスタム middleware
2. `express.json()`
3. `api` 配下の API 処理
4. `express.static()` による静的ファイル配信
5. 静的ファイル用の HTML 404 レスポンス
