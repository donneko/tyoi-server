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

## Events

ログイベント名を次の形式に変更します。

```text
server/*:log -> server/log:*
```

## CLI

`tyoi dev` は削除しました。生成されたプロジェクトの `npm run dev` と `tyoi run` は引き続き利用できます。

テンプレート指定には `--template` と `-t`、ポート指定には `--port` と `-p`、ブラウザ起動には `--open` と `-o` を利用できます。
