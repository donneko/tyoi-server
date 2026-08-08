# 実践レシピ

## API とページを同じポートで配信する

```ts
const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    api: "/api",
});

app.get("/status", () => ({ ready: true }));
await app.start();
```

`public/main/index.html` は `/`、API は `/api/status` から利用できます。

## スマートフォンで確認する

```ts
await app.start({
    lan: true,
    qr: true,
});
```

同じ LAN に接続した端末で QR コードを読み取ります。

## リクエストへ共通処理を追加する

```ts
const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    middlewares: [
        (req, res, next) => {
            const startedAt = Date.now();
            res.on("finish", () => console.log(req.method, req.url, Date.now() - startedAt));
            next();
        },
    ],
});
```

## GET / POST 以外を登録する

`ShortHandler` のショートカットは GET と POST だけですが、内部の `Server` には任意の HTTP method のキーを登録できます。

```ts
app.server.onApi("PUT:/items", ({ body }) => ({ updated: body }));
```

この例は `PUT /api/items` で呼び出せます。

## 型でルート名を制限する

```ts
type API = "GET:/health" | "POST:/items";
type WS = "/events";

const server = new Server<API, WS>({
    root: import.meta.dirname,
    public: "../public/main",
});
```
