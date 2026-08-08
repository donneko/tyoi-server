# Use WebSockets

## Echo server

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

Connect from a browser:

```js
const socket = new WebSocket("ws://localhost:3000/ws");

socket.addEventListener("open", () => socket.send("hello"));
socket.addEventListener("message", (event) => console.log(event.data));
```

`api` is not added to WebSocket paths. WebSockets use the same HTTP server and port, and only connections whose URL pathname exactly matches a registered path are accepted.

## Send to multiple clients

Keep connected `ws` instances in your application to implement chat or live notifications. The `realtime-ts` template includes an example.

```bash
tyoi create realtime-app --template realtime-ts
```

When the server stops, connected clients receive close code `1001`.
