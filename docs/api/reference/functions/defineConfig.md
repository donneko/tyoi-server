[@donneko/tyoi-server](../index.md) / defineConfig

# Function: defineConfig()

> **defineConfig**(`config`): `object`

Defined in: [server-core/config/define-config.ts:24](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/config/define-config.ts#L24)

CLI で読み込むサーバー設定を検証して返します。

`tyoi.config.js` の default export に指定します。
`baseDirname` は CLI 起動時に自動設定されるため、通常は指定不要です。

## Parameters

### config

サーバー設定。未指定の項目には既定値が使われます。

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

## Returns

`object`

検証済みのユーザー設定。

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

設定値が不正な場合。

## Example

```ts
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
  port: 3000,
  publicDirname: "../public/main",
});
```
