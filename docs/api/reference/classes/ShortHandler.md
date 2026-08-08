[@donneko/tyoi-server](../index.md) / ShortHandler

# Class: ShortHandler

Defined in: [short-handler/short-handler.ts:16](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L16)

`tyoi()` が返す簡易サーバー API。

API と WebSocket を登録し、必要に応じて `server` から
基盤となる `Server` の全機能へアクセスできます。

## Constructors

### Constructor

> **new ShortHandler**(`server`): `ShortHandler`

Defined in: [short-handler/short-handler.ts:19](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L19)

#### Parameters

##### server

[`Server`](Server.md)

#### Returns

`ShortHandler`

## Accessors

### server

#### Get Signature

> **get** **server**(): [`Server`](Server.md)

Defined in: [short-handler/short-handler.ts:23](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L23)

基盤となる `Server` インスタンスを取得します。

##### Returns

[`Server`](Server.md)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:55](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L55)

サーバーを停止し、接続の終了を待機します。

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:28](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L28)

GET API ハンドラを登録します。

#### Parameters

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:43](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L43)

`start()` の別名です。

#### Parameters

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### post()

> **post**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:33](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L33)

POST API ハンドラを登録します。

#### Parameters

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:47](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L47)

サーバーを起動します。

#### Parameters

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:51](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L51)

`close()` の別名です。

#### Returns

`Promise`\<`void`\>

***

### ws()

> **ws**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:38](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/short-handler/short-handler.ts#L38)

WebSocket ハンドラを登録します。

#### Parameters

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### Returns

`this`
