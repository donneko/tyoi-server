# 基本設定

## 設定ファイルを使う

`tyoi.config.js` をプロジェクト直下に置きます。

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    autoPort: true,
    public: "./public/main",
    api: "/api",
    browser: false,
});
```

```bash
tyoi run
```

CLI は `root` をプロジェクトのディレクトリに設定します。そのため `public` は通常、設定ファイルを置いたプロジェクトを基準に指定します。

## プログラムから設定する

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    api: "/api",
    port: 3000,
    autoPort: true,
});

await app.start();
```

プログラムから生成する場合は `root` が必須です。

## 管理GUIを有効にする

`gui: true` を指定すると、`/__tyoi/` でサーバーの概要、状態、最新ログを確認できます。設定例、管理エンドポイント、LAN公開時の注意事項は[組み込み管理GUI](./management-gui.md)を参照してください。

## 起動時だけ設定を渡す

```ts
await app.start({
    port: 3001,
    autoPort: true,
    browser: "local",
});
```

`start()` で指定できるのは `port`、`lan`、`qr`、`autoPort`、`browser` です。それ以外は `tyoi()` / `new Server()` または設定ファイルで指定します。
