# メッセージ系

## 概要

外部の JSON 辞書から多言語メッセージを同期ロードして管理する内部モジュールです。

## 使い方

```ts
import { MessageManager } from "./message-manager.js";

const manager = new MessageManager("ja-JP", "./languages");

manager.setLanguage("ja-JP");
const message = manager.message("example.message", { name: "John" });

console.log(message);
```

辞書は次の形式で、メッセージキーはドット区切りのフラットな文字列を使用します。

```json
{
    "example.message": "こんにちは、{name}さん！"
}
```
