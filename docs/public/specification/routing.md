# 静的ファイルの配信仕様

静的配信には Express の `express.static(publicDirectoryPath)` を使用します。`publicDirectoryPath` は `path.resolve(baseDirname, publicDirname)` で決まります。

## ルーティング順序

```text
カスタム middleware
  → JSON parser
  → apiPrefix 配下の API
  → 静的ファイル
  → HTML 404
```

このため、`apiPrefix` 配下の未登録パスは API の JSON 404 になり、同じパスの静的ファイルへはフォールスルーしません。それ以外の未検出パスはローカライズされた HTML 404 を返します。

## ディレクトリの解決

- 相対 `publicDirname` は `baseDirname` を基準に解決します。
- 絶対 `publicDirname` も `path.resolve()` によりそのまま使用できます。
- CLI は設定ファイルが見つかった場合、現在の作業ディレクトリを `baseDirname` にします。
- プログラム API では `baseDirname` を明示する必要があります。

## 対応範囲

- 通常のファイル配信とディレクトリの `index.html` 解決は Express に従います。
- ディレクトリ一覧は生成しません。
- SPA 用の任意パスから `index.html` への fallback はありません。
- キャッシュ制御や追加ヘッダーを独自指定する tyoi-server の設定項目はありません。必要な場合は `middlewares` を使用します。

## 公開時の注意

`exposeLan: true` では配信ディレクトリの内容を LAN 上の端末から取得できます。秘密鍵、環境変数、ソースマップなど、公開不要なファイルを `publicDirname` に置かないでください。
