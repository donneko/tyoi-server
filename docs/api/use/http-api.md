# HTTP API を作る

## 最小例

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
});

app.get("/status", ({ query }) => ({
    service: "example",
    query,
}));

app.post("/messages", ({ body, headers }) => ({
    received: body,
    contentType: headers["content-type"],
}));

await app.start();
```

## ルートパラメータ

Express 5形式の名前付きパラメータ、ワイルドカード、省略可能部分を利用できます。

```ts
app.get("/users/:id", ({ params }) => ({ id: params?.id }));
app.get("/files/*splat", ({ params }) => ({ path: params?.splat }));
app.get("/reports{/:year}", ({ params }) => ({ year: params?.year }));
```

静的ルートは動的ルートより優先されるため、`/users/me` と `/users/:id` は安全に併用できます。

## HTTP statusを指定する

`apiResponse()` を返すと、本文とHTTP statusを明示できます。通常の戻り値は引き続き `200` です。

```ts
import { apiResponse } from "@donneko/tyoi-server";

app.post("/users", () => apiResponse({ id: 1 }, { status: 201 }));
app.post("/jobs", () => apiResponse(undefined, { status: 204 }));
```

パスは一致してもメソッドが未登録の場合は `405 Method Not Allowed` と `Allow` ヘッダーを返します。

デフォルトの `api` は `/api` なので、エンドポイントは `GET /api/status` と `POST /api/messages` です。

## リクエストする

```bash
curl "http://localhost:3000/api/status?detail=true"
curl -X POST http://localhost:3000/api/messages \
  -H "content-type: application/json" \
  -d '{"text":"hello"}'
```

成功時はハンドラーの戻り値がそのまま JSON レスポンスになります。

```json
{
  "received": { "text": "hello" },
  "contentType": "application/json"
}
```

`fetch()` では HTTP status に基づく `Response.ok` で成功を判定します。

```ts
const response = await fetch("http://localhost:3000/api/status");

if (!response.ok) {
    const error = await response.json();
    throw new Error(`${error.code}: ${error.message}`);
}

const result = await response.json();
```

## 非同期処理

ハンドラーは値または Promise を返せます。

```ts
app.get("/users", async () => {
    const users = await loadUsers();
    return { users };
});
```

## API を直接管理する

`tyoi()` の戻り値にある `server` から、登録確認、解除、一度だけの実行、HTTP を介さない手動実行ができます。

```ts
const unsubscribe = app.server.onApi("GET:/health", () => ({ status: "ok" }));

console.log(app.server.hasApi("GET:/health"));

const result = await app.server.emitApi("GET:/health", {
    query: {},
    body: undefined,
    headers: {},
});

unsubscribe();
```

`emitApi()` と HTTP API は、どちらも登録済みハンドラーの戻り値を直接返します。HTTP API の場合だけ、その値が JSON レスポンスへ変換されます。
