[@donneko/tyoi-server](../index.md) / defineConfig

# Function: defineConfig()

> **defineConfig**\<`Config`\>(`config`): `Config`

Defined in: [server-core/config/define-config.ts:32](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/config/define-config.ts#L32)

CLI で読み込むサーバー設定を検証して返します。

`tyoi.config.js` の default export に指定します。
`root` は CLI 起動時に自動設定されるため、通常は指定不要です。

Validates and returns server configuration loaded by the CLI. Use it as the
default export of `tyoi.config.js`. The CLI sets `root` automatically,
so it normally does not need to be specified.

## Type Parameters

### Config

`Config` *extends* [`ServerConfig`](../type-aliases/ServerConfig.md)

## Parameters

### config

`ExactServerConfig`\<`Config`\>

サーバー設定。未指定の項目には既定値が使われます。 / Server configuration. Defaults are used for omitted properties.

## Returns

`Config`

検証済みのユーザー設定。 / The validated user configuration.

## Throws

設定値が不正な場合。 / If a configuration value is invalid.

## Example

```ts
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
  port: 3000,
  public: "../public/main",
});
```
