# 設定項目

| 項目 | 型 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `baseDirname` | `string` | なし | 相対パスの基準。プログラム利用では必須、CLI 利用では自動設定 |
| `publicDirname` | `string` | `"../public/main"` | 静的ファイルディレクトリ。`baseDirname` からの相対パスまたは絶対パス |
| `apiPrefix` | `string` | `"/api"` | HTTP API を mount するパス |
| `port` | `number` | `3000` | 待受ポート。`0` なら OS が空きポートを割り当てる |
| `middlewares` | `express.RequestHandler[]` | `[]` | API・静的配信より前に追加する Express middleware |
| `exposeLan` | `boolean` | `false` | `true` なら `0.0.0.0`、`false` なら `127.0.0.1` で待ち受ける |
| `showQrCode` | `boolean` | `false` | Network URL の QR コードをターミナルへ表示 |
| `openBrowser` | `boolean \| "local" \| "network"` | `false` | 起動後に開く URL。`true` は `"local"` と同じ |
| `autoPort` | `boolean` | `false` | 使用中ならポート番号を 1 ずつ増やして空きを探す |
| `signalShutdownHandling` | `boolean` | `true` | `SIGINT` / `SIGTERM` で停止処理を実行 |
| `language` | `string` | `"ja-JP"` | サーバーと CLI のメッセージ言語 |

## `openBrowser`

| 値 | 動作 |
| --- | --- |
| `false` | 開かない |
| `true` | Local URL を開く |
| `"local"` | Local URL を開く |
| `"network"` | `exposeLan: true` なら Network URL、そうでなければ警告して Local URL を開く |

## `autoPort`

指定ポートが使用中で `autoPort: true` の場合、利用可能になるまでポート番号を 1 ずつ増やします。`false` の場合は次のポートを使用するか対話で確認し、拒否されると起動に失敗します。

起動後の `getPort()` は実際に使われたポートを返します。

## 検証

`defineConfig()` は Zod スキーマで設定を検証し、不正な型では `ZodError` を投げます。
