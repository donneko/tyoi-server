[@donneko/tyoi-server](../index.md) / serverDefaultConfigSchema

# Variable: serverDefaultConfigSchema

> `const` **serverDefaultConfigSchema**: `ZodObject`\<\{ `apiPrefix`: `ZodString`; `autoPort`: `ZodBoolean`; `baseDirname`: `ZodOptional`\<`ZodString`\>; `exposeLan`: `ZodBoolean`; `language`: `ZodString`; `middlewares`: `ZodArray`\<`ZodCustom`\<`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>\>\>; `openBrowser`: `ZodUnion`\<readonly \[`ZodBoolean`, `ZodEnum`\<\{ `local`: `"local"`; `network`: `"network"`; \}\>\]\>; `port`: `ZodNumber`; `publicDirname`: `ZodString`; `showQrCode`: `ZodBoolean`; `signalShutdownHandling`: `ZodBoolean`; \}, `$strip`\>

Defined in: [server-core/types/server-config.type.ts:23](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/types/server-config.type.ts#L23)

既定値適用後のサーバー設定スキーマです。 / Schema for server configuration after applying defaults.
