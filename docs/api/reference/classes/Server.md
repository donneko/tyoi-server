[@donneko/tyoi-server](../index.md) / Server

# クラス: Server\<RequestNameList, WebSocketNameList\>

定義: [server-core/app/server.ts:18](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L18)

HTTP API、WebSocket、静的ファイル配信を提供するサーバーです。

A server that provides HTTP APIs, WebSocket endpoints, and static file serving.

## 型パラメーター

### RequestNameList

`RequestNameList` *extends* `string` = `string`

登録できる HTTP API キー（例: `"GET:/health"`）。 / HTTP API keys that can be registered, such as `"GET:/health"`.

### WebSocketNameList

`WebSocketNameList` *extends* `string` = `string`

登録できる WebSocket パス。 / WebSocket paths that can be registered.

## コンストラクター

### コンストラクター

> **new Server**\<`RequestNameList`, `WebSocketNameList`\>(`options?`): `Server`\<`RequestNameList`, `WebSocketNameList`\>

定義: [server-core/app/server.ts:54](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L54)

サーバーを作成し、ルーティングと静的ファイル配信を初期化します。

`baseDirname` は必須です。起動は `start()` で明示的に行います。

Creates the server and initializes routing and static file serving.
`baseDirname` is required. Call `start()` explicitly to start listening.

#### パラメータ

##### options?

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。 / Server options.

#### 戻り値

`Server`\<`RequestNameList`, `WebSocketNameList`\>

#### 例

```ts
import { Server } from "@donneko/tyoi-server";

 type RequestNameList = "GET:/test" | "GET:/test/a" | "GET:/a";

 const server = new Server<RequestNameList>({
     baseDirname: import.meta.dirname,
     publicDirname:"../public/main",
     apiPrefix:"/api",
     port:3000,
 });

 server.onAPI("GET:/test", (data) => {
     return data;
 });
 await server.start();
```

## プロパティ

### emitAPI

> **emitAPI**: \<`Key`\>(`type`, `arg`) => `Promise`\<`unknown`\>

定義: [server-core/app/server.ts:179](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L179)

HTTP API ハンドラをリクエストなしで実行します。 / Invokes an HTTP API handler without an HTTP request.

キー名で登録されたハンドラを実行します。 / Invokes the handler registered for a key.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

実行するキー名。 / Key to invoke.

##### arg

[`RequestData`](../type-aliases/RequestData.md)

ハンドラに渡す引数。 / Argument passed to the handler.

#### 戻り値

`Promise`\<`unknown`\>

#### 例

```ts
registry.emit("foo",arg);
```

***

### getConfig

> **getConfig**: \<`K`\>(`key`) => `object`\[`K`\]

定義: [server-core/app/server.ts:159](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L159)

解決済みのサーバー設定を取得します。 / Returns the resolved server configuration.

#### 型パラメーター

##### K

`K` *extends* `"baseDirname"` \| `"publicDirname"` \| `"apiPrefix"` \| `"port"` \| `"middlewares"` \| `"exposeLan"` \| `"showQrCode"` \| `"openBrowser"` \| `"autoPort"` \| `"signalShutdownHandling"` \| `"language"`

#### パラメータ

##### key

`K`

#### 戻り値

`object`\[`K`\]

***

### hasAPI

> **hasAPI**: (`type`) => `type is string`

定義: [server-core/app/server.ts:177](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L177)

指定した HTTP API ハンドラが登録されているかを返します。 / Returns whether the HTTP API has a registered handler.

ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.

#### パラメータ

##### type

`string`

調べるキー名。 / Key to check.

#### 戻り値

`type is string`

存在する場合は `true`。 / `true` when a handler exists.

#### 例

```ts
console.log(registry.has("foo"));
```

***

### hasEvent

> **hasEvent**: (`type`) => `type is "server/*:log"`

定義: [server-core/app/server.ts:168](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L168)

指定したイベントにハンドラが登録されているかを返します。 / Returns whether the event has a registered handler.

ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.

#### パラメータ

##### type

`string`

調べるキー名。 / Key to check.

#### 戻り値

`type is "server/*:log"`

存在する場合は `true`。 / `true` when a handler exists.

#### 例

```ts
console.log(eventBus.has("foo"));
```

***

### hasWebSocket

> **hasWebSocket**: (`type`) => `type is string`

定義: [server-core/app/server.ts:190](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L190)

指定した WebSocket ハンドラが登録されているかを返します。 / Returns whether the WebSocket path has a registered handler.

#### パラメータ

##### type

`string`

#### 戻り値

`type is string`

***

### offAPI

> **offAPI**: \<`Key`\>(`type`) => `void`

定義: [server-core/app/server.ts:175](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L175)

HTTP API ハンドラを解除します。 / Removes an HTTP API handler.

ハンドラの登録を解除します。 / Unregisters a handler.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

解除するキー名。 / Key to unregister.

#### 戻り値

`void`

#### 例

```ts
registry.off("foo");
```

***

### offEvent

> **offEvent**: \<`Key`\>(`type`, `fn`) => `void`

定義: [server-core/app/server.ts:166](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L166)

イベントハンドラを解除します。 / Removes an event handler.

ハンドラの登録を解除します。 / Unregisters a handler.

#### 型パラメーター

##### Key

`Key` *extends* `"server/*:log"`

#### パラメータ

##### type

`Key`

解除するキー名。 / Key to unregister.

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

#### 戻り値

`void`

#### 例

```ts
eventBus.off("foo",handler);
```

***

### offWebSocket

> **offWebSocket**: \<`Key`\>(`type`) => `void`

定義: [server-core/app/server.ts:188](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L188)

WebSocket ハンドラを解除します。 / Removes a WebSocket handler.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

#### 戻り値

`void`

***

### onAPI

> **onAPI**: \<`KEY`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:171](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L171)

HTTP API ハンドラを登録します。 / Registers an HTTP API handler.

ハンドラを登録します。 / Registers a handler.

#### 型パラメーター

##### KEY

`KEY` *extends* `string`

#### パラメータ

##### type

`KEY`

登録するキー名。 / Key to register.

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

実行するハンドラ。 / Handler to invoke.

#### 戻り値

ハンドラを解除するための関数。 / A function that unregisters the handler.

() => `void`

#### 例

```ts
const unsubscribe = registry.on("foo", handler);
unsubscribe(); // ハンドラを解除 / Unregister the handler
```

***

### onceAPI

> **onceAPI**: \<`Key`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:173](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L173)

一度だけ実行する HTTP API ハンドラを登録します。 / Registers a one-time HTTP API handler.

一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

登録するキー名。 / Key to register.

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

実行するハンドラ。 / Handler to invoke.

#### 戻り値

() => `void`

#### 例

```ts
registry.once("foo", handler);
```

***

### onceEvent

> **onceEvent**: \<`Key`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:164](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L164)

一度だけ実行するイベントハンドラを登録します。 / Registers a one-time event handler.

一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.

#### 型パラメーター

##### Key

`Key` *extends* `"server/*:log"`

#### パラメータ

##### type

`Key`

登録するキー名。 / Key to register.

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

実行するハンドラ。 / Handler to invoke.

#### 戻り値

() => `void`

#### 例

```ts
eventBus.once("foo", handler);
```

***

### onceWebSocket

> **onceWebSocket**: \<`Key`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:184](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L184)

一度だけ実行する WebSocket ハンドラを登録します。 / Registers a one-time WebSocket handler.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### 戻り値

() => `void`

***

### onEvent

> **onEvent**: \<`Key`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:162](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L162)

イベントハンドラを登録します。 / Registers an event handler.

ハンドラを登録します。 / Registers a handler.

#### 型パラメーター

##### Key

`Key` *extends* `"server/*:log"`

#### パラメータ

##### type

`Key`

登録するキー名。 / Key to register.

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

実行するハンドラ。 / Handler to invoke.

#### 戻り値

ハンドラを解除するための関数。 / A function that unregisters the handler.

() => `void`

#### 例

```ts
const unsubscribe = eventBus.on("foo", handler);
unsubscribe(); // ハンドラを解除 / Unregister the handler
```

***

### onWebSocket

> **onWebSocket**: \<`Key`\>(`type`, `fn`) => () => `void`

定義: [server-core/app/server.ts:182](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L182)

WebSocket ハンドラを登録します。 / Registers a WebSocket handler.

#### 型パラメーター

##### Key

`Key` *extends* `string`

#### パラメータ

##### type

`Key`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### 戻り値

() => `void`

## メソッド

### close()

> **close**(): `Promise`\<`void`\>

定義: [server-core/app/server.ts:112](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L112)

`stop()` の別名です。 / Alias for `stop()`.

#### 戻り値

`Promise`\<`void`\>

***

### getHttpServer()

> **getHttpServer**(): `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `null`

定義: [server-core/app/server.ts:155](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L155)

基盤となる Node.js の HTTP サーバーを取得します。 / Returns the underlying Node.js HTTP server.

#### 戻り値

`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `null`

***

### getPort()

> **getPort**(): `number`

定義: [server-core/app/server.ts:151](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L151)

現在設定されているポート番号を返します。 / Returns the currently configured port.

#### 戻り値

`number`

***

### isRunning()

> **isRunning**(): `boolean`

定義: [server-core/app/server.ts:147](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L147)

サーバーが起動中かを返します。 / Returns whether the server is running.

#### 戻り値

`boolean`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [server-core/app/server.ts:64](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L64)

`start()` の別名です。 / Alias for `start()`.

#### パラメータ

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

定義: [server-core/app/server.ts:89](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L89)

HTTP サーバーを起動します。

`options` はコンストラクターで渡した設定を、この起動に限らず
上書きします。すでに起動済み、または起動処理中の場合は `undefined` を返します。

Starts the HTTP server. `options` overrides the constructor configuration
for this and subsequent starts. Returns `undefined` if the server is already
running or is currently starting.

#### パラメータ

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

起動時に上書きする設定。 / Options that override the current configuration when starting.

#### 戻り値

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

起動した HTTP サーバー。すでに起動済みの場合は `undefined`。 / The started HTTP server, or `undefined` if already running.

#### Throws

ポートの確保や HTTP サーバーの起動に失敗した場合。 / If the port cannot be acquired or the HTTP server cannot start.

#### 例

```ts
await server.start({
  port: 3000,
  showQrCode: false,
});
```

***

### stop()

> **stop**(): `Promise`\<`void`\>

定義: [server-core/app/server.ts:130](https://github.com/donneko/tyoi-api-node-server/blob/8fc6549033de1a5f4451d86f6614883350995cac/src/server/server-core/app/server.ts#L130)

HTTP サーバーを停止し、既存の接続を終了します。

接続が 10 秒以内に閉じない場合は、残った接続を強制的に閉じます。
起動していない場合、または停止処理中の場合は何もしません。

Stops the HTTP server and closes existing connections. Remaining connections
are forcibly closed after 10 seconds. Does nothing if the server is not running
or is already stopping.

#### 戻り値

`Promise`\<`void`\>

停止完了時に解決する Promise。 / A promise that resolves when shutdown completes.

#### Throws

HTTP サーバーの停止に失敗した場合。 / If the HTTP server cannot be stopped.
