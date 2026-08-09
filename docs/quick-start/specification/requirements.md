# 動作要件と生成される構成

## 動作要件

| 項目 | 要件 |
| --- | --- |
| Node.js | 20.14 以上 |
| モジュール形式 | ESM (`"type": "module"`) |
| パッケージ | `@donneko/tyoi-server` |
| CLI 実行ファイル | `tyoi` |

## 互換性方針

v1.x では公開 TypeScript API と文書化済みの通信仕様に破壊的変更を行いません。後方互換な追加と修正は行われる場合があります。次の破壊的変更は v2.0.0 で行います。

## `create` と `init` の違い

| コマンド | コピー先 | 既存ディレクトリ |
| --- | --- | --- |
| `tyoi create <name>` | 現在のディレクトリ直下の `<name>/` | 同名ディレクトリがあると失敗 |
| `tyoi init <name>` | 現在のディレクトリ | 新しい子ディレクトリを作らない |

プロジェクト名に使用できる文字は英字、数字、ハイフンです。名前を省略した場合、CLI が入力を求めます。

## 基本 TypeScript テンプレート

`basic-ts` は概ね次の構成を生成します。

```text
my-app/
├─ package.json
├─ tsconfig.json
├─ tyoi.config.js
├─ src/
│  └─ server.ts
└─ public/
   └─ main/
      └─ index.html
```

`npm run dev` は `tsx watch src/server.ts`、`npm run build` は `tsc`、`npm start` はビルド済みの `dist/server.js` を実行します。
