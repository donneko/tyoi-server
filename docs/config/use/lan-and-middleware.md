# LAN 公開と middleware

## LAN からアクセスする

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    publicDirname: "./public/main",
    exposeLan: true,
    showQrCode: true,
    openBrowser: "network",
});
```

`exposeLan: true` では `0.0.0.0` で待ち受けます。ターミナルに Network URL と QR コードを表示し、同じネットワーク上の端末からアクセスできます。

> LAN 上の他端末から API と静的ファイルへアクセス可能になります。認証・認可・TLS は自動では追加されないため、公開してよい開発用データだけを扱ってください。

## Express middleware を追加する

```js
import { defineConfig } from "@donneko/tyoi-server";
import morgan from "morgan";

export default defineConfig({
    publicDirname: "./public/main",
    middlewares: [morgan("dev")],
});
```

独自 middleware は組み込みの JSON parser、API、静的配信より前に登録されます。認証、CORS、ログ、独自ヘッダーなどを共通処理として追加できます。

```ts
const app = tyoi({
    baseDirname: import.meta.dirname,
    publicDirname: "../public/main",
    middlewares: [
        (req, res, next) => {
            res.setHeader("x-powered-by", "tyoi");
            next();
        },
    ],
});
```
