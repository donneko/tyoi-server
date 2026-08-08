[@donneko/tyoi-server](../index.md) / defineConfig

# 関数: defineConfig()

> **defineConfig**(`config`): `object`

定義: [server-core/config/define-config.ts:28](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/config/define-config.ts#L28)

CLI で読み込むサーバー設定を検証して返します。

`tyoi.config.js` の default export に指定します。
`baseDirname` は CLI 起動時に自動設定されるため、通常は指定不要です。

Validates and returns server configuration loaded by the CLI. Use it as the
default export of `tyoi.config.js`. The CLI sets `baseDirname` automatically,
so it normally does not need to be specified.

## パラメータ

### config

サーバー設定。未指定の項目には既定値が使われます。 / Server configuration. Defaults are used for omitted properties.

#### apiPrefix?

`string` = `...`

#### autoPort?

`boolean` = `...`

#### baseDirname?

`string` = `...`

#### exposeLan?

`boolean` = `...`

#### language?

`string` = `...`

#### middlewares?

`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[] = `...`

#### openBrowser?

`boolean` \| `"local"` \| `"network"` = `...`

#### port?

`number` = `...`

#### publicDirname?

`string` = `...`

#### showQrCode?

`boolean` = `...`

#### signalShutdownHandling?

`boolean` = `...`

## 戻り値

`object`

検証済みのユーザー設定。 / The validated user configuration.

### apiPrefix?

> `optional` **apiPrefix?**: `string`

### autoPort?

> `optional` **autoPort?**: `boolean`

### baseDirname?

> `optional` **baseDirname?**: `string`

### exposeLan?

> `optional` **exposeLan?**: `boolean`

### language?

> `optional` **language?**: `string`

### middlewares?

> `optional` **middlewares?**: `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>[]

### openBrowser?

> `optional` **openBrowser?**: `boolean` \| `"local"` \| `"network"`

### port?

> `optional` **port?**: `number`

### publicDirname?

> `optional` **publicDirname?**: `string`

### showQrCode?

> `optional` **showQrCode?**: `boolean`

### signalShutdownHandling?

> `optional` **signalShutdownHandling?**: `boolean`

## Throws

設定値が不正な場合。 / If a configuration value is invalid.

## 例

```ts
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
  port: 3000,
  publicDirname: "../public/main",
});
```
