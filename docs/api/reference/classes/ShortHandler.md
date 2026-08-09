[@donneko/tyoi-server](../index.md) / ShortHandler

# クラス: ShortHandler\<RequestNameList, WebSocketNameList\>

定義: [short-handler/short-handler.ts:23](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L23)

`tyoi()` が返す簡易サーバー API。

API と WebSocket を登録し、必要に応じて `server` から
基盤となる `Server` の全機能へアクセスできます。

A compact server API returned by `tyoi()`. Register HTTP APIs and WebSocket
handlers directly, or use `server` to access the complete underlying `Server` API.

## 型パラメーター

### RequestNameList

`RequestNameList` *extends* `string` = `string`

登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.

### WebSocketNameList

`WebSocketNameList` *extends* `string` = `string`

登録できる WebSocket パス。 / WebSocket paths that can be registered.

## コンストラクター

### コンストラクター

> **new ShortHandler**\<`RequestNameList`, `WebSocketNameList`\>(`server`): `ShortHandler`\<`RequestNameList`, `WebSocketNameList`\>

定義: [short-handler/short-handler.ts:29](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L29)

#### パラメータ

##### server

[`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

#### 戻り値

`ShortHandler`\<`RequestNameList`, `WebSocketNameList`\>

## アクセッサー

### server

#### 署名を取得する

> **get** **server**(): [`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

定義: [short-handler/short-handler.ts:33](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L33)

基盤となる `Server` インスタンスを取得します。 / Returns the underlying `Server` instance.

##### 戻り値

[`Server`](Server.md)\<`RequestNameList`, `WebSocketNameList`\>

## メソッド

### close()

> **close**(): `Promise`\<`void`\>

定義: [short-handler/short-handler.ts:79](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L79)

サーバーを停止し、接続の終了を待機します。 / Stops the server and waits for connections to close.

#### 戻り値

`Promise`\<`void`\>

***

### get()

> **get**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:38](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L38)

型付きキーの `GET:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `GET:` key.

#### パラメータ

##### pass

`string` *extends* `RequestNameList` ? `string` : `RequestNameList` *extends* `` `GET:${Path}` `` ? `Path` : `never`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### 戻り値

`this`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [short-handler/short-handler.ts:67](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L67)

`start()` の別名です。 / Alias for `start()`.

#### パラメータ

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### post()

> **post**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:50](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L50)

型付きキーの `POST:` に対応する API ハンドラを登録します。 / Registers an API handler for a typed `POST:` key.

#### パラメータ

##### pass

`string` *extends* `RequestNameList` ? `string` : `RequestNameList` *extends* `` `POST:${Path}` `` ? `Path` : `never`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

#### 戻り値

`this`

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [short-handler/short-handler.ts:71](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L71)

サーバーを起動します。 / Starts the server.

#### パラメータ

##### options?

[`StartOptions`](../type-aliases/StartOptions.md)

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

定義: [short-handler/short-handler.ts:75](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L75)

`close()` の別名です。 / Alias for `close()`.

#### 戻り値

`Promise`\<`void`\>

***

### ws()

> **ws**(`pass`, `fn`): `this`

定義: [short-handler/short-handler.ts:62](https://github.com/donneko/tyoi-server/blob/main/src/server/short-handler/short-handler.ts#L62)

WebSocket ハンドラを登録します。 / Registers a WebSocket handler.

#### パラメータ

##### pass

`WebSocketNameList`

##### fn

[`Handler`](../type-aliases/Handler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### 戻り値

`this`
