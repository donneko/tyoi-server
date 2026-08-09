[@donneko/tyoi-server](../index.md) / ShortHandler

# Class: ShortHandler\<RequestNameList, WebSocketNameList\>

Defined in: [short-handler/short-handler.ts:23](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L23)

`tyoi()` が返す簡易サーバー API。

API と WebSocket を登録し、必要に応じて `server` から
基盤となる `Server` の全機能へアクセスできます。

A compact server API returned by `tyoi()`. Register HTTP APIs and WebSocket
handlers directly, or use `server` to access the complete underlying `Server` API.

## Type Parameters

### RequestNameList

`RequestNameList` *extends* `string` = `string`

登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.

### WebSocketNameList

`WebSocketNameList` *extends* `string` = `string`

登録できる WebSocket パス。 / WebSocket paths that can be registered.

## Constructors

### Constructor

> **new ShortHandler**\<`RequestNameList`, `WebSocketNameList`\>(`server`): `ShortHandler`\<`RequestNameList`, `WebSocketNameList`\>

Defined in: [short-handler/short-handler.ts:29](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L29)

#### Parameters

##### server

[`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

#### Returns

`ShortHandler`\<`RequestNameList`, `WebSocketNameList`\>

## Accessors

### server

#### Get Signature

> **get** **server**(): [`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

Defined in: [short-handler/short-handler.ts:33](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L33)

基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance.

##### Returns

[`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:79](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L79)

サーバーを停止し、接続の終了を待機します。 / Stops the server and waits for connections to close.

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:38](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L38)

型付きキーの `GET:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `GET:` key.

#### Parameters

##### pass

`string` *extends* `RequestNameList` ? `string` : `RequestNameList` *extends* `` `GET:${Path}` `` ? `Path` : `never`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:67](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L67)

`start()` の別名です。 / Alias for `start()`.

#### Parameters

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### post()

> **post**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:50](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L50)

型付きキーの `POST:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `POST:` key.

#### Parameters

##### pass

`string` *extends* `RequestNameList` ? `string` : `RequestNameList` *extends* `` `POST:${Path}` `` ? `Path` : `never`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### Returns

`this`

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [short-handler/short-handler.ts:71](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L71)

サーバーを起動します。 / Starts the server.

#### Parameters

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [short-handler/short-handler.ts:75](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L75)

`close()` の別名です。 / Alias for `close()`.

#### Returns

`Promise`\<`void`\>

***

### ws()

> **ws**(`pass`, `fn`): `this`

Defined in: [short-handler/short-handler.ts:62](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L62)

WebSocket ハンドラを登録します。 / Registers a WebSocket handler.

#### Parameters

##### pass

`WebSocketNameList`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### Returns

`this`
