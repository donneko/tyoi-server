[@donneko/tyoi-server](../index.md) / serverDefaultConfigSchema

# Variable: serverDefaultConfigSchema

> `const` **serverDefaultConfigSchema**: `ZodObject`\<\{ `apiPrefix`: `ZodString`; `autoPort`: `ZodBoolean`; `baseDirname`: `ZodOptional`\<`ZodString`\>; `exposeLan`: `ZodBoolean`; `language`: `ZodString`; `middlewares`: `ZodArray`\<`ZodCustom`\<`RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>, `RequestHandler`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>\>\>; `openBrowser`: `ZodUnion`\<readonly \[`ZodBoolean`, `ZodEnum`\<\{ `local`: `"local"`; `network`: `"network"`; \}\>\]\>; `port`: `ZodNumber`; `publicDirname`: `ZodString`; `showQrCode`: `ZodBoolean`; `signalShutdownHandling`: `ZodBoolean`; \}, `$strip`\>

Defined in: [server-core/types/server-config.type.ts:20](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/types/server-config.type.ts#L20)
