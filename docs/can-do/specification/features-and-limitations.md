# 機能と制約

## できること

- GET / POST の JSON API を短いコードで登録する
- `Server` から任意の HTTP method の API キーを登録する
- 同じ HTTP サーバーで静的ファイルを配信する
- パス単位で WebSocket ハンドラーを登録する
- 同じプロセスから API、ページ、WebSocket を提供する
- Express middleware を追加する
- Local URL と Network URL を表示する
- LAN 向け QR コードを表示する
- ポート競合時に別ポートを探索する
- SIGINT / SIGTERM で HTTP と WebSocket を停止する
- CLI テンプレートから用途別プロジェクトを作る

## 現在の制約

- パッケージは experimental だが、v1.x では公開 TypeScript API と文書化済みの通信仕様に破壊的変更を行わない。後方互換な追加と修正は行われる場合があり、破壊的変更は v2.0.0 で行う
- API 登録パス、WebSocket 登録パス、公開ファイルの URL パスでは、先頭セグメントが `__tyoi` から始まる名前を内部利用のために予約している。`/__tyoi`、`/__tyoi-status`、`/__tyoi_assets/...` などはアプリケーションから使用しない。API のベースが `/api` の場合、登録パス `/__tyoi-status` に対応する `/api/__tyoi-status` も予約対象になる
- `ShortHandler` の HTTP ショートカットは `get()` と `post()` のみ
- API パスは完全一致で、Express の `/:id` のようなパスパラメーター登録には対応していない
- API ハンドラーから HTTP status、レスポンスヘッダー、ストリームを直接制御する API はない
- API の成功レスポンスは `{ ok: true, data }` でラップされる
- 認証、認可、CORS、TLS、rate limit、永続化は組み込みではない
- 静的配信に SPA fallback はなく、未検出パスは HTML の 404 になる
- WebSocket の部屋、broadcast、メッセージ形式はアプリ側で実装する
- CLI の設定ファイルは JavaScript のみで、TypeScript は探索対象外
- 複数の `tyoi*.config.js` は merge されず、1 つを選択する

不足する HTTP 機能は `middlewares`、状態管理や認証はアプリ側のコードで補います。
