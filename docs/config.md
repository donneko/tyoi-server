# Config

`tyoi.config.js` をプロジェクトルート、または `config/` ディレクトリに置くと、`tyoi` または `tyoi run` で読み込まれます。

生成済みテンプレートには `tyoi.config.js` が含まれています。既存プロジェクトに設定ファイルだけを追加する場合は `tyoi config` を使います。

```bash
tyoi config
```

現在の設定テンプレートは `basic` です。

```bash
tyoi config --template basic
```

```js
import { defineConfig } from "@donneko/tyoi-server";
import morgan from "morgan";

export default defineConfig({
    port: 3000,
    autoPort: true,
    public: "./public/main",
    api: "/api",
    lan: false,
    qr: false,
    browser: true,
    middlewares: [
        morgan("dev")
    ]
});
```

CLI の設定ファイルから起動する場合、`public` はプロジェクトルートから見た相対パスとして扱われます。

## Config File Lookup

`tyoi run` と `tyoi info` は、現在のディレクトリから設定ファイルを探します。

利用できるファイル名:

- `tyoi.config.js`
- `tyoi.<name>.config.js`

> .ts ファイルはサポートさません。

設定ファイルはプロジェクトルート、または `config/` ディレクトリに置けます。

```text
my-app/
  tyoi.config.js
  config/
    tyoi.dev.config.js
    tyoi.lan.config.js
```

複数の設定ファイルが見つかった場合は、CLI 上で使用する設定ファイルを選択できます。

## Options

| option | type | default | description |
| --- | --- | --- | --- |
| `port` | `number` | `3000` | 起動するポート番号 |
| `autoPort` | `boolean` | `false` | 指定ポートが使用中のときに別ポートを探す |
| `public` | `string` | `"../public/main"` | 静的ファイルとして配信するディレクトリ |
| `api` | `string` | `"/api"` | API のベースパス |
| `middlewares` | `express.RequestHandler[]` | `[]` | 追加する Express middleware |
| `browser` | `boolean \| "local" \| "lan"` | `false` | 起動時にブラウザを開く |
| `lan` | `boolean` | `false` | LAN 内の他の端末からアクセスできるようにする |
| `qr` | `boolean` | `false` | Network URL の QR Code を表示する |
| `signalClose` | `boolean` | `true` | `SIGINT` / `SIGTERM` でサーバーを停止する |

## Browser Open

```js
export default defineConfig({
    browser: true
});
```

- `true`: Local URL を開く
- `"local"`: Local URL を開く
- `"lan"`: `lan: true` のとき Network URL を開く
- `false`: ブラウザを開かない

## LAN And QR Code

```js
export default defineConfig({
    lan: true,
    qr: true,
    browser: "lan"
});
```

LAN 公開時は、同じ Wi-Fi やネットワークに接続している端末からアクセス可能になります。
公開してよいファイルや API だけを扱ってください。

## Programmatic Options

`tyoi()` や `new Server()` からサーバーを作る場合も、ほぼ同じ設定を渡せます。

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    port: 3000,
    autoPort: true
});

await app.start();
```

`root` は `tyoi()` や `new Server()` で直接作る場合に必要です。CLI から起動する場合は自動で設定されます。

起動時だけ一部の設定を上書きする場合は `start()` に渡せます。

```ts
await app.start({
    port: 3001,
    browser: "local"
});
```
