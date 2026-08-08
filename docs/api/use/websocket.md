# WebSocket を使う

## エコーサーバー

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
});

app.ws("/ws", ({ ws, req }) => {
    console.log("connected", req.socket.remoteAddress);
    ws.send("connected");

    ws.on("message", (value) => {
        ws.send(`echo: ${value.toString()}`);
    });
});

await app.start();
```

ブラウザーから接続します。

```js
const socket = new WebSocket("ws://localhost:3000/ws");

socket.addEventListener("open", () => socket.send("hello"));
socket.addEventListener("message", (event) => console.log(event.data));
```

WebSocket のパスには `api` は付きません。同じ HTTP サーバーとポートを使い、URL の pathname が登録パスと完全一致する接続だけを受け付けます。

## 複数クライアントへ送る

接続した `ws` をアプリ側で保持すると、チャットやライブ通知を実装できます。実装例は `realtime-ts` テンプレートに含まれています。

```bash
tyoi create realtime-app --template realtime-ts
```

サーバー停止時は接続中のクライアントへ close code `1001` が送られます。
