# LAN access and middleware

## Access from the LAN

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    public: "./public/main",
    lan: true,
    qr: true,
    browser: "lan",
});
```

With `lan: true`, the server listens on `0.0.0.0`. It displays the network URL and a QR code in the terminal, allowing access from devices on the same network.

> The API and static files become accessible from other devices on the LAN. Authentication, authorization, and TLS are not added automatically, so only expose development data that is safe to share.

## Add Express middleware

```js
import { defineConfig } from "@donneko/tyoi-server";
import morgan from "morgan";

export default defineConfig({
    public: "./public/main",
    middlewares: [morgan("dev")],
});
```

Custom middleware is registered before the built-in JSON parser, APIs, and static file serving. Use it to add shared behavior such as authentication, CORS, logging, or custom headers.

```ts
const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    middlewares: [
        (req, res, next) => {
            res.setHeader("x-powered-by", "tyoi");
            next();
        },
    ],
});
```
