[@donneko/tyoi-server](../index.md) / RequestData

# Type Alias: RequestData

> **RequestData** = `object`

Defined in: [server-core/types/public/api.type.ts:2](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/types/public/api.type.ts#L2)

HTTP API ハンドラに渡されるリクエスト情報です。 / Request data passed to an HTTP API handler.

## Properties

### body

> **body**: `unknown`

Defined in: [server-core/types/public/api.type.ts:4](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/types/public/api.type.ts#L4)

***

### headers

> **headers**: `unknown`

Defined in: [server-core/types/public/api.type.ts:5](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/types/public/api.type.ts#L5)

***

### params?

> `optional` **params?**: `Readonly`\<`Record`\<`string`, `string` \| `string`[]\>\>

Defined in: [server-core/types/public/api.type.ts:7](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/types/public/api.type.ts#L7)

ルートから抽出されたパラメータです。 / Parameters extracted from the route.

***

### query

> **query**: `unknown`

Defined in: [server-core/types/public/api.type.ts:3](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/types/public/api.type.ts#L3)
