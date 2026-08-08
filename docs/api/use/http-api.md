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

デフォルトの `api` は `/api` なので、エンドポイントは `GET /api/status` と `POST /api/messages` です。

## リクエストする

```bash
curl "http://localhost:3000/api/status?detail=true"
curl -X POST http://localhost:3000/api/messages \
  -H "content-type: application/json" \
  -d '{"text":"hello"}'
```

成功時はハンドラーの戻り値が `data` に入ります。

```json
{
  "ok": true,
  "data": {
    "received": { "text": "hello" },
    "contentType": "application/json"
  }
}
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

`emitApi()` は登録済みハンドラーだけを実行し、HTTP レスポンスの `{ ok, data }` ラッパーは付けません。
