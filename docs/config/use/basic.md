# 基本設定

## 設定ファイルを使う

`tyoi.config.js` をプロジェクト直下に置きます。

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    autoPort: true,
    publicDirname: "./public/main",
    apiPrefix: "/api",
    openBrowser: false,
});
```

```bash
tyoi run
```

CLI は `baseDirname` をプロジェクトのディレクトリに設定します。そのため `publicDirname` は通常、設定ファイルを置いたプロジェクトを基準に指定します。

## プログラムから設定する

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    baseDirname: import.meta.dirname,
    publicDirname: "../public/main",
    apiPrefix: "/api",
    port: 3000,
    autoPort: true,
});

await app.start();
```

プログラムから生成する場合は `baseDirname` が必須です。

## 起動時だけ設定を渡す

```ts
await app.start({
    port: 3001,
    autoPort: true,
    openBrowser: "local",
});
```

`start()` で指定できるのは `port`、`exposeLan`、`showQrCode`、`autoPort`、`openBrowser` です。それ以外は `tyoi()` / `new Server()` または設定ファイルで指定します。
