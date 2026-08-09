# はじめる

## 必要なもの

- Node.js 20.14 以上
- npm

## TypeScript プロジェクトを作る

```bash
npm install @donneko/tyoi-server
npx tyoi create my-app --template basic-ts
cd my-app
npm install
npm run dev
```

ターミナルに表示された Local URL を開きます。生成されたプロジェクトには、静的ページ、GET / POST API、WebSocket の最小例が含まれています。

確認できるエンドポイントは次のとおりです。

```text
GET  /api/hello
POST /api/echo
WS   /ws
```

たとえば GET API は次のように確認できます。

```bash
curl http://localhost:3000/api/hello
```

## JavaScript で始める

```bash
npm install @donneko/tyoi-server
npx tyoi create my-app --template basic-js
cd my-app
npm install
npm run dev
```

基本構成は TypeScript 版と同じで、サーバー実装が JavaScript になります。

## 既存のディレクトリに作る

`init` は新しい子ディレクトリを作らず、現在のディレクトリにテンプレートをコピーします。

```bash
mkdir my-app
cd my-app
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-ts
npm install
npm run dev
```

## 次に読む

- HTTP API を追加する: [HTTP API を作る](/api/use/http-api)
- 静的ファイルを配信する: [静的ファイルを配信する](/public/use/static-files)
- 設定を変更する: [基本設定](/config/use/basic)
- テンプレートを選ぶ: [テンプレート一覧](/example/specification/template-catalog)
