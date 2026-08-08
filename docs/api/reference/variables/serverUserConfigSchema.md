[@donneko/tyoi-server](../index.md) / serverUserConfigSchema

# Variable: serverUserConfigSchema

> `const` **serverUserConfigSchema**: `ZodObject`\<\{ `apiPrefix`: `ZodOptional`\<`ZodString`\>; `autoPort`: `ZodOptional`\<`ZodBoolean`\>; `baseDirname`: `ZodOptional`\<`ZodString`\>; `exposeLan`: `ZodOptional`\<`ZodBoolean`\>; `language`: `ZodOptional`\<`ZodString`\>; `middlewares`: `ZodOptional`\<`ZodArray`\<`ZodCustom`\<`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>\>\>\>; `openBrowser`: `ZodOptional`\<`ZodUnion`\<readonly \[`ZodBoolean`, `ZodEnum`\<\{ `local`: `"local"`; `network`: `"network"`; \}\>\]\>\>; `port`: `ZodOptional`\<`ZodNumber`\>; `publicDirname`: `ZodOptional`\<`ZodString`\>; `showQrCode`: `ZodOptional`\<`ZodBoolean`\>; `signalShutdownHandling`: `ZodOptional`\<`ZodBoolean`\>; \}, `$strip`\>

Defined in: [server-core/types/server-config.type.ts:4](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/types/server-config.type.ts#L4)
