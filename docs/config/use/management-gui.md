# 組み込み管理GUI

組み込み管理GUIでは、実行中のtyoi-serverの公開設定、稼働状態、直近のサーバーログをブラウザーから確認できます。監視専用で、設定変更やサーバー停止の操作は提供しません。

## ローカルで有効にする

`gui` の既定値は `false` です。次のように有効にします。

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    port: 3000,
    gui: true,
});

await app.start();
```

起動後に `http://127.0.0.1:3000/__tyoi/` を開きます。`port: 0` や `autoPort: true` を使う場合は、起動時に表示される実際のLocal URLへ `/__tyoi/` を追加してください。

`gui: true` は `gui: { allowLan: false }` と同じです。HTTPとWebSocketの接続元は実ソケットのアドレスで判定され、IPv4・IPv6のループバック接続だけが許可されます。プロキシの転送ヘッダーは判定に使用しません。

## 画面

| 画面 | 内容 |
| --- | --- |
| Summary | `root`、`public`、`api`、ポート、LAN設定などの公開サーバー設定 |
| Status | 稼働状態、実際のポート、稼働時間、最終更新日時 |
| Live Log | サーバーイベントから収集した最新30件のログ。新しい順に表示 |

ブラウザーは同一オリジンの管理APIを読み込み、WebSocketが切断された場合は自動的に再接続します。Astroは静的資産のビルドにだけ使用され、パッケージ利用時の実行時依存には含まれません。

## LANから閲覧する

LANから接続するには、サーバー自体のLAN待ち受けとGUIのLAN許可を両方有効にします。

```ts
const app = tyoi({
    root: import.meta.dirname,
    port: 3000,
    lan: true,
    gui: { allowLan: true },
});
```

::: danger 認証はありません
`allowLan: true` では、サーバーへ到達できるすべての利用者がプロジェクトのパス、公開設定、稼働状態、ログを閲覧できます。インターネットへ直接公開せず、信頼できるネットワークでだけ使用してください。
:::

`lan: true` だけではGUIのLANアクセスは許可されません。反対に `allowLan: true` だけを設定しても、サーバーがループバックで待ち受けるためLANからは接続できません。

## 予約エンドポイント

GUIを有効にすると、利用者が設定した `api` や静的ファイル配信より先に次のパスが処理されます。

| 種類 | パス | 内容 |
| --- | --- | --- |
| GUI | `GET /__tyoi/` | 管理画面 |
| 管理API | `GET /__tyoi/api/summary` | 公開サーバー設定 |
| 管理API | `GET /__tyoi/api/status` | 稼働状態、実ポート、稼働時間 |
| 管理API | `GET /__tyoi/api/log` | 最新30件のログ |
| WebSocket | `WS /__tyoi/ws` | 接続時のスナップショットと、その後のログ |

WebSocketは接続時に `snapshot` メッセージを1件送信し、その後、新しいログごとに `log` メッセージを送信します。これらはtyoi-serverの内部管理エンドポイントであり、利用者のHTTP APIやWebSocketハンドラーで上書きできません。

`__tyoi` から始まる先頭パスセグメントは、将来の内部機能も含めて予約されています。アプリケーションのAPI、WebSocket、公開ファイルでは使用しないでください。

## 無効にする

`gui: false` を指定するか `gui` を省略すると、管理画面、管理API、管理WebSocketは登録されません。既存のアプリケーション動作は変わりません。
