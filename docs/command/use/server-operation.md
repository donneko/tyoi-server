# CLI でサーバーを操作する

## 起動する

```bash
tyoi run
```

コマンド名を省略した `tyoi` も `run` と同じ動作です。

```bash
tyoi --port 3001
```

ポートを上書きし、ブラウザーも開く場合は次のように実行します。

```bash
tyoi run --port 3001 --open
```

## 使用する設定を確認する

```bash
tyoi info
```

設定ファイルが複数ある場合、`run` と `info` は使用するファイルを対話形式で選択します。

## 表示言語を変更する

```bash
tyoi setting language en-US
tyoi setting language ja-JP
```

設定は実行したディレクトリの `.tyoi-server/config.json` に保存されます。現在同梱されている言語は `ja-JP` と `en-US` です。

## ヘルプとバージョン

```bash
tyoi help
tyoi --help
tyoi --version
```
