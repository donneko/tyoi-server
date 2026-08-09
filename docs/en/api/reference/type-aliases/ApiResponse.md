[@donneko/tyoi-server](../index.md) / ApiResponse

# Type Alias: ApiResponse\<T\>

> **ApiResponse**\<`T`\> = `object`

Defined in: [server-core/service/api-response.ts:4](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/service/api-response.ts#L4)

APIハンドラーが返すHTTP statusとbodyです。 / HTTP status and body returned by an API handler.

## Type Parameters

### T

`T`

## Properties

### \[API\_RESPONSE\]

> `readonly` **\[API\_RESPONSE\]**: `true`

Defined in: [server-core/service/api-response.ts:7](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/service/api-response.ts#L7)

***

### body

> `readonly` **body**: `T`

Defined in: [server-core/service/api-response.ts:5](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/service/api-response.ts#L5)

***

### status

> `readonly` **status**: `number`

Defined in: [server-core/service/api-response.ts:6](https://github.com/donneko/tyoi-server/blob/main/src/server/server-core/service/api-response.ts#L6)
