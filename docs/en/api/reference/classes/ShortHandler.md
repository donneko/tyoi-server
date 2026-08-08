[@donneko/tyoi-server](../index.md) / ShortHandler

# Class: ShortHandler

Defined in: [short-handler/short-handler.ts:19](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L19)

`tyoi()` が返す簡易サーバー API。

API と WebSocket を登録し、必要に応じて `server` から
基盤となる `Server` の全機能へアクセスできます。

A compact server API returned by `tyoi()`. Register HTTP APIs and WebSocket
handlers directly, or use `server` to access the complete underlying `Server` API.

## Constructors

### Constructor

> **new ShortHandler**(`server`): `ShortHandler`

Defined in: [short-handler/short-handler.ts:22](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L22)

#### Parameters

##### server

[`Server`](Server.md)

#### Returns

`ShortHandler`

## Accessors

### server

#### Get Signature

> **get** **server**(): [`Server`](Server.md)

Defined in: [short-handler/short-handler.ts:26](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L26)

基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance.

##### Returns

[`Server`](Server.md)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:58](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L58)

サーバーを停止し、接続の終了を待機します。 / Stops the server and waits for connections to close.

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:31](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L31)

GET API ハンドラを登録します。 / Registers a GET API handler.

#### Parameters

##### pass

`string`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:46](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L46)

`start()` の別名です。 / Alias for `start()`.

#### Parameters

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### post()

> **post**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:36](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L36)

POST API ハンドラを登録します。 / Registers a POST API handler.

#### Parameters

##### pass

`string`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:50](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L50)

サーバーを起動します。 / Starts the server.

#### Parameters

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:54](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L54)

`close()` の別名です。 / Alias for `close()`.

#### Returns

`Promise`\<`void`\>

***

### ws()

> **ws**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:41](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/short-handler/short-handler.ts#L41)

WebSocket ハンドラを登録します。 / Registers a WebSocket handler.

#### Parameters

##### pass

`string`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### Returns

`this`
