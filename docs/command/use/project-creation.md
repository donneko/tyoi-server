# プロジェクトを作る

## 新しいディレクトリに作る

```bash
tyoi create my-app --template basic-ts
cd my-app
npm install
npm run dev
```

`create` は現在のディレクトリに `my-app/` を作成します。同名のディレクトリがすでにある場合は上書きせず失敗します。

## 現在のディレクトリに作る

```bash
mkdir my-app
cd my-app
tyoi init my-app --template basic-ts
npm install
npm run dev
```

`init` は子ディレクトリを作らず、現在のディレクトリへテンプレートをコピーします。

## 対話形式で選ぶ

プロジェクト名またはテンプレートを省略すると、CLI が入力や選択を求めます。

```bash
tyoi create
tyoi init
```

## 設定ファイルだけ追加する

既存プロジェクトへ `tyoi.config.js` を追加できます。

```bash
tyoi config my-app --template basic
```

設定テンプレートは現在 `basic` のみです。
