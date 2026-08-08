# 設定の読み込みと優先順位

## プログラム API

解決順は次のとおりです。後の設定が同じキーを上書きします。

```text
組み込みデフォルト
  → tyoi(options) / new Server(options)
  → start(options)
  → 起動時に決まった実ポート
```

`start(options)` は設定マネージャーを更新するため、そのインスタンスから `getConfig()` で更新後の値を参照できます。

## CLI

`tyoi run` の解決順は次のとおりです。

```text
組み込みデフォルト
  → 選択した tyoi*.config.js
  → .tyoi-server/config.json の language
  → CLI オプション
  → CLI が設定する baseDirname
  → 起動時に決まった実ポート
```

## 設定ファイルの場所

```text
my-app/
├─ tyoi.config.js
└─ config/
   ├─ tyoi.dev.config.js
   └─ environments/
      └─ tyoi.lan.config.js
```

現在のディレクトリ直下と `config/` 以下を探索します。対応形式は ESM の JavaScript です。

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    publicDirname: "./public/main",
});
```

複数ファイルを自動的に merge する機能はありません。複数見つかった場合は、起動ごとに 1 ファイルを選択します。
