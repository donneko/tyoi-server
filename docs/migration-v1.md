# v1.0.0 Migration Guide

v1.0.0 は v0.0.8 からの破壊的変更を含みます。

## Config

| v0.0.8 | v1.0.0 |
| --- | --- |
| `baseDirname` | `root` |
| `publicDirname` | `public` |
| `apiPrefix` | `api` |
| `exposeLan` | `lan` |
| `showQrCode` | `qr` |
| `openBrowser` | `browser` |
| `signalShutdownHandling` | `signalClose` |

`openBrowser: "network"` は `browser: "lan"` に変更します。

## API methods

| v0.0.8 | v1.0.0 |
| --- | --- |
| `onAPI` | `onApi` |
| `onceAPI` | `onceApi` |
| `offAPI` | `offApi` |
| `hasAPI` | `hasApi` |
| `emitAPI` | `emitApi` |
| `ApiRegistry` | `HandlerRegistry` |
| `ApiRegistryHandler` | `Handler` |

`Server` と `tyoi` の名前は変更していません。

## HTTP API レスポンス

HTTP API の成功レスポンスは、ハンドラーの戻り値を直接返す形式に変更しました。未登録 API とハンドラー例外のレスポンスからも `ok` を削除しました。

| v0.0.8 | v1.0.0 |
| --- | --- |
| `{ "ok": true, "data": <handler result> }` | `<handler result>` |
| `{ "ok": false, "code": "API_NOT_FOUND", "message": ... }` | `{ "code": "API_NOT_FOUND", "message": ... }` |
| `{ "ok": false, "code": "API_INTERNAL_ERROR", "message": ... }` | `{ "code": "API_INTERNAL_ERROR", "message": ... }` |

`fetch()` を使うクライアントは `Response.ok` で成功を判定し、従来の `json.data` ではなく `json` 自体を結果として使用します。

```ts
const response = await fetch(url);
const json = await response.json();

if (!response.ok) {
    throw new Error(`${json.code}: ${json.message}`);
}

console.log(json);
```

`ShortHandler` と `tyoi()` には、`Server` と同じ `"METHOD:/path"` 形式の型付き登録キーを指定できます。型引数を省略する既存コードは変更不要です。

## Events

ログイベント名を次の形式に変更します。

```text
server/*:log -> server/log:*
```

## CLI

`tyoi dev` は削除しました。生成されたプロジェクトの `npm run dev` と `tyoi run` は引き続き利用できます。

テンプレート指定には `--template` と `-t`、ポート指定には `--port` と `-p`、ブラウザ起動には `--open` と `-o` を利用できます。
