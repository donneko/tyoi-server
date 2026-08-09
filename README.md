# tyoi-server

[日本語](./README.md) | [English](./README.en.md)

![NPM Version](https://img.shields.io/npm/v/%40donneko%2Ftyoi-server) ![NPM License](https://img.shields.io/npm/l/%40donneko%2Ftyoi-server)

Express をベースにした、ローカル開発向けの API・静的ファイルサーバーフレームワークです。CLI から用途別テンプレートを作成でき、HTTP API、WebSocket、静的ファイル配信、LAN 公開に対応しています。

v1.x では公開 TypeScript API と文書化済みの通信仕様に破壊的変更を行いません。後方互換な追加と修正は行われる場合があります。次の破壊的変更は v2.0.0 で行います。

## クイックスタート

Node.js 20.14 以上が必要です。

```bash
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-js
npm install
npm run dev
```

起動後、表示された Local URL をブラウザーで開きます。詳しくは[クイックスタート](https://donneko.github.io/tyoi-server/quick-start/use/getting-started.html)を参照してください。

## 用途別ドキュメント

- [API の使用例](https://donneko.github.io/tyoi-server/api/use/http-api.html) / [API の仕様](https://donneko.github.io/tyoi-server/api/specification/short-handler.html)
- [CLI の使用例](https://donneko.github.io/tyoi-server/command/use/project-creation.html) / [CLI の仕様](https://donneko.github.io/tyoi-server/command/specification/commands.html)
- [設定の使用例](https://donneko.github.io/tyoi-server/config/use/basic.html) / [設定の仕様](https://donneko.github.io/tyoi-server/config/specification/options.html)
- [テンプレートの使用例](https://donneko.github.io/tyoi-server/example/use/templates.html) / [テンプレートの仕様](https://donneko.github.io/tyoi-server/example/specification/template-catalog.html)
- [できることの例](https://donneko.github.io/tyoi-server/can-do/use/recipes.html) / [機能と制約](https://donneko.github.io/tyoi-server/can-do/specification/features-and-limitations.html)
- [静的ファイル配信の使用例](https://donneko.github.io/tyoi-server/public/use/static-files.html) / [配信仕様](https://donneko.github.io/tyoi-server/public/specification/routing.html)
- [v1 移行ガイド](https://donneko.github.io/tyoi-server/migration-v1.html)
- [自動生成 API リファレンス](https://donneko.github.io/tyoi-server/api/reference/)

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
