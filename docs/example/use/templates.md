# 用途別テンプレートを試す

## 基本 API・WebSocket

```bash
tyoi create basic-app --template basic-ts
cd basic-app
npm install
npm run dev
```

`basic-ts` には静的ページ、`GET /api/hello`、`POST /api/echo`、`/ws` の WebSocket エコーが含まれます。JavaScript を使う場合は `basic-js` を選びます。

## 静的サイト

```bash
tyoi create website --template static-ts
cd website
npm install
npm run dev
```

`public/main/` の HTML、CSS、JavaScript を編集します。サーバーコードはなく、`tyoi.config.js` と `tyoi run` で配信します。

## JSON API

```bash
tyoi create task-api --template api-ts
cd task-api
npm install
npm run dev
```

確認例:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/tasks
curl -X POST http://localhost:3000/api/tasks \
  -H "content-type: application/json" \
  -d '{"title":"First task"}'
```

データはメモリー上に保持され、プロセスを再起動すると初期化されます。

## リアルタイムアプリ

```bash
tyoi create chat-app --template realtime-ts
cd chat-app
npm install
npm run dev
```

複数のブラウザータブでページを開くと、`/ws` を通じてメッセージと接続人数が共有されます。
