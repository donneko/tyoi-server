# tyoi-server

[日本語](./README.md) | [English](./README.en.md)

![NPM Version](https://img.shields.io/npm/v/%40donneko%2Ftyoi-server) ![NPM License](https://img.shields.io/npm/l/%40donneko%2Ftyoi-server)

Express をベースにした、ローカル開発向けの API・静的ファイルサーバーフレームワークです。CLI から用途別テンプレートを作成でき、HTTP API、WebSocket、静的ファイル配信、LAN 公開に対応しています。

> このプロジェクトは experimental です。将来のリリースで API が変更される可能性があります。

## クイックスタート

Node.js 20.14 以上が必要です。

```bash
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-js
npm install
npm run
```

起動後、表示された Local URL をブラウザーで開きます。詳しくは[クイックスタート](./docs/quick-start/use/getting-started.md)を参照してください。

## 用途別ドキュメント

- [API の使用例](./docs/api/use/http-api.md) / [API の仕様](./docs/api/specification/short-handler.md)
- [CLI の使用例](./docs/command/use/project-creation.md) / [CLI の仕様](./docs/command/specification/commands.md)
- [設定の使用例](./docs/config/use/basic.md) / [設定の仕様](./docs/config/specification/options.md)
- [テンプレートの使用例](./docs/example/use/templates.md) / [テンプレートの仕様](./docs/example/specification/template-catalog.md)
- [できることの例](./docs/can-do/use/recipes.md) / [機能と制約](./docs/can-do/specification/features-and-limitations.md)
- [静的ファイル配信の使用例](./docs/public/use/static-files.md) / [配信仕様](./docs/public/specification/routing.md)
- [v1 移行ガイド](./docs/migration-v1.md)
- [自動生成 API リファレンス](./docs/api/reference/index.md)

## 最小のプログラム例

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public",
    api: "/api",
    port: 3000,
});

app.get("/hello", () => ({ message: "Hello Tyoi!" }));

await app.start();
```

この API はデフォルト設定では `GET /api/hello` で呼び出せます。


## ライセンス

MIT
