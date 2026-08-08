[@donneko/tyoi-server](../index.md) / serverUserConfigSchema

# 変数: serverUserConfigSchema

> `const` **serverUserConfigSchema**: `ZodObject`\<\{ `apiPrefix`: `ZodOptional`\<`ZodString`\>; `autoPort`: `ZodOptional`\<`ZodBoolean`\>; `baseDirname`: `ZodOptional`\<`ZodString`\>; `exposeLan`: `ZodOptional`\<`ZodBoolean`\>; `language`: `ZodOptional`\<`ZodString`\>; `middlewares`: `ZodOptional`\<`ZodArray`\<`ZodCustom`\<`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>\>\>\>; `openBrowser`: `ZodOptional`\<`ZodUnion`\<readonly \[`ZodBoolean`, `ZodEnum`\<\{ `local`: `"local"`; `network`: `"network"`; \}\>\]\>\>; `port`: `ZodOptional`\<`ZodNumber`\>; `publicDirname`: `ZodOptional`\<`ZodString`\>; `showQrCode`: `ZodOptional`\<`ZodBoolean`\>; `signalShutdownHandling`: `ZodOptional`\<`ZodBoolean`\>; \}, `$strip`\>

定義: [server-core/types/server-config.type.ts:5](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/types/server-config.type.ts#L5)

利用者が指定できるサーバー設定のスキーマです。 / Schema for user-provided server configuration.
