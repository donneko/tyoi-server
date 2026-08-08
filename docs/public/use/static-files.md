# 静的ファイルを配信する

## ディレクトリを指定する

```text
my-app/
├─ src/
│  └─ server.ts
└─ public/
   └─ main/
      ├─ index.html
      ├─ assets/app.js
      └─ assets/style.css
```

```ts
const app = tyoi({
    baseDirname: import.meta.dirname,
    publicDirname: "../public/main",
});

await app.start({ openBrowser: "local" });
```

`src/server.ts` から見て `../public/main` が配信元になります。

```text
http://localhost:3000/                  → public/main/index.html
http://localhost:3000/assets/app.js     → public/main/assets/app.js
http://localhost:3000/assets/style.css  → public/main/assets/style.css
```

## 設定ファイルから配信する

サーバーコードが不要な静的サイトでは `tyoi.config.js` だけでも起動できます。

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    publicDirname: "./public/main",
    port: 3000,
    autoPort: true,
});
```

```bash
tyoi run --open
```

すぐに試す場合は `static-ts` テンプレートを利用できます。

```bash
tyoi create website --template static-ts
```
