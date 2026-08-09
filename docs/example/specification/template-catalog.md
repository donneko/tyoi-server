# テンプレート一覧

## プロジェクトテンプレート

| 名前 | 言語 | 起動方式 | 含まれる例 |
| --- | --- | --- | --- |
| `basic-ts` | TypeScript | `tsx watch src/server.ts` | 静的ページ、GET、POST、WebSocket、morgan |
| `basic-js` | JavaScript | `node --watch src/server.js` | `basic-ts` 相当の JavaScript 実装 |
| `static-ts` | HTML / CSS / JavaScript | `tyoi run --open` | 静的サイト、404 ページ、ブラウザー JS の型チェック |
| `api-ts` | TypeScript | `tsx watch src/server.ts` | health、タスク一覧・作成、入力検証、インメモリストア |
| `realtime-ts` | TypeScript | `tsx watch src/server.ts` | WebSocket チャット、接続管理、メッセージ検証 |

すべて Node.js 20.14 以上、ESM を前提とし、`package.json` のパッケージ名と tyoi-server のバージョンは生成時に置換されます。

## 設定テンプレート

| 名前 | 生成物 | 主な設定 |
| --- | --- | --- |
| `basic` | `tyoi.config.js` | port、autoPort、public、api、LAN、QR、browser、morgan |

## 共通スクリプト

TypeScript のサーバーテンプレートは `dev`、`typecheck` または `build`、`start` を提供します。`static-ts` はコンパイルするサーバーコードを持たず、`tyoi run` で直接起動します。

テンプレートのファイルがコピー先にすでに存在する場合は、コピー結果を確認してから利用してください。`create` 自体は既存の宛先ディレクトリを拒否します。
