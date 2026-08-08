[@donneko/tyoi-server](../index.md) / ShortHandler

# クラス: ShortHandler

定義: [short-handler/short-handler.ts:19](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L19)

`tyoi()` が返す簡易サーバー API。

API と WebSocket を登録し、必要に応じて `server` から
基盤となる `Server` の全機能へアクセスできます。

A compact server API returned by `tyoi()`. Register HTTP APIs and WebSocket
handlers directly, or use `server` to access the complete underlying `Server` API.

## コンストラクター

### コンストラクター

> **new ShortHandler**(`server`): `ShortHandler`

定義: [short-handler/short-handler.ts:22](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L22)

#### パラメータ

##### server

[`Server`](Server.md)

#### 戻り値

`ShortHandler`

## アクセッサー

### server

#### 署名を取得する

> **get** **server**(): [`Server`](Server.md)

定義: [short-handler/short-handler.ts:26](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L26)

基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance.

##### 戻り値

[`Server`](Server.md)

## メソッド

### close()

> **close**(): `Promise`\<`void`\>

定義: [short-handler/short-handler.ts:58](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L58)

サーバーを停止し、接続の終了を待機します。 / Stops the server and waits for connections to close.

#### 戻り値

`Promise`\<`void`\>

***

### get()

> **get**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:31](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L31)

GET API ハンドラを登録します。 / Registers a GET API handler.

#### パラメータ

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### 戻り値

`this`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [short-handler/short-handler.ts:46](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L46)

`start()` の別名です。 / Alias for `start()`.

#### パラメータ

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### post()

> **post**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:36](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L36)

POST API ハンドラを登録します。 / Registers a POST API handler.

#### パラメータ

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### 戻り値

`this`

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [short-handler/short-handler.ts:50](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L50)

サーバーを起動します。 / Starts the server.

#### パラメータ

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

定義: [short-handler/short-handler.ts:54](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L54)

`close()` の別名です。 / Alias for `close()`.

#### 戻り値

`Promise`\<`void`\>

***

### ws()

> **ws**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:41](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/short-handler/short-handler.ts#L41)

WebSocket ハンドラを登録します。 / Registers a WebSocket handler.

#### パラメータ

##### pass

`string`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### 戻り値

`this`
