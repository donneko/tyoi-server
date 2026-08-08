# ライフサイクルとイベント

## 起動状態を確認する

```ts
const httpServer = await app.start();

console.log(app.server.isRunning());
console.log(app.server.getPort());
console.log(app.server.getHttpServer() === httpServer);
console.log(app.server.getConfig("apiPrefix"));
```

`autoPort` またはポート `0` を使用した場合、`getPort()` は実際に割り当てられたポートを返します。

## 停止する

```ts
await app.close();
```

`listen()` は `start()`、`stop()` は `close()` のエイリアスです。停止時には WebSocket 接続も閉じられます。

## ログイベントを購読する

```ts
const onLog = (data) => {
    if (data) console.log(data.type, data.message);
};

const unsubscribe = app.server.onEvent("server/*:log", onLog);

app.server.onceEvent("server/*:log", (data) => {
    console.log("最初のログ", data?.message);
});

console.log(app.server.hasEvent("server/*:log"));
unsubscribe();
```

`offEvent()` を直接使う場合は、登録時と同じ関数を渡します。

```ts
app.server.offEvent("server/*:log", onLog);
```
