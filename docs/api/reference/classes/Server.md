[@donneko/tyoi-server](../index.md) / Server

# Class: Server\<RequestNameList, WebSocketNameList\>

Defined in: [server-core/app/server.ts:16](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L16)

HTTP API、WebSocket、静的ファイル配信を提供するサーバーです。

## Type Parameters

### RequestNameList

`RequestNameList` *extends* `string` = `string`

登録できる HTTP API キー（例: `"GET:/health"`）。

### WebSocketNameList

`WebSocketNameList` *extends* `string` = `string`

登録できる WebSocket パス。

## Constructors

### Constructor

> **new Server**\<`RequestNameList`, `WebSocketNameList`\>(`options?`): `Server`\<`RequestNameList`, `WebSocketNameList`\>

Defined in: [server-core/app/server.ts:49](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L49)

サーバーを作成し、ルーティングと静的ファイル配信を初期化します。

`baseDirname` は必須です。起動は `start()` で明示的に行います。

#### Parameters

##### options?

[`ServerOptions`](../type-aliases/ServerOptions.md)

サーバー設定。

#### Returns

`Server`\<`RequestNameList`, `WebSocketNameList`\>

#### Example

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

## Properties

### emitAPI

> **emitAPI**: \<`Key`\>(`type`, `arg`) => `Promise`\<`unknown`\>

Defined in: [server-core/app/server.ts:166](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L166)

HTTP API ハンドラをリクエストなしで実行します。

キー名で登録されたハンドラを実行する

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

解除するするキー名

##### arg

[`RequestData`](../type-aliases/RequestData.md)

ハンドラにわたす引数

#### Returns

`Promise`\<`unknown`\>

#### Example

```ts
registry.emit("foo",arg);
```

***

### getConfig

> **getConfig**: \<`K`\>(`key`) => `object`\[`K`\]

Defined in: [server-core/app/server.ts:146](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L146)

解決済みのサーバー設定を取得します。

#### Type Parameters

##### K

`K` *extends* `"baseDirname"` \| `"publicDirname"` \| `"apiPrefix"` \| `"port"` \| `"middlewares"` \| `"exposeLan"` \| `"showQrCode"` \| `"openBrowser"` \| `"autoPort"` \| `"signalShutdownHandling"` \| `"language"`

#### Parameters

##### key

`K`

#### Returns

`object`\[`K`\]

***

### hasAPI

> **hasAPI**: (`type`) => `type is string`

Defined in: [server-core/app/server.ts:164](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L164)

指定した HTTP API ハンドラが登録されているかを返します。

ハンドラがストアに存在するかを検証する

#### Parameters

##### type

`string`

調べるキー名

#### Returns

`type is string`

存在するならtrue

#### Example

```ts
console.log(registry.has("foo"));
```

***

### hasEvent

> **hasEvent**: (`type`) => `type is "server/*:log"`

Defined in: [server-core/app/server.ts:155](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L155)

指定したイベントにハンドラが登録されているかを返します。

ハンドラがストアに存在するかを検証する

#### Parameters

##### type

`string`

調べるキー名

#### Returns

`type is "server/*:log"`

存在するならtrue

#### Example

```ts
console.log(eventBus.has("foo"));
```

***

### hasWebSocket

> **hasWebSocket**: (`type`) => `type is string`

Defined in: [server-core/app/server.ts:177](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L177)

指定した WebSocket ハンドラが登録されているかを返します。

#### Parameters

##### type

`string`

#### Returns

`type is string`

***

### offAPI

> **offAPI**: \<`Key`\>(`type`) => `void`

Defined in: [server-core/app/server.ts:162](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L162)

HTTP API ハンドラを解除します。

ハンドラの登録を解除する

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

解除するするキー名

#### Returns

`void`

#### Example

```ts
registry.off("foo",handler);
```

***

### offEvent

> **offEvent**: \<`Key`\>(`type`, `fn`) => `void`

Defined in: [server-core/app/server.ts:153](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L153)

イベントハンドラを解除します。

ハンドラの登録を解除する

#### Type Parameters

##### Key

`Key` *extends* `"server/*:log"`

#### Parameters

##### type

`Key`

解除するするキー名

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

#### Returns

`void`

#### Example

```ts
eventBus.off("foo",handler);
```

***

### offWebSocket

> **offWebSocket**: \<`Key`\>(`type`) => `void`

Defined in: [server-core/app/server.ts:175](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L175)

WebSocket ハンドラを解除します。

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

#### Returns

`void`

***

### onAPI

> **onAPI**: \<`KEY`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:158](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L158)

HTTP API ハンドラを登録します。

ハンドラを登録する関数

#### Type Parameters

##### KEY

`KEY` *extends* `string`

#### Parameters

##### type

`KEY`

登録するキー名

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

実行する関数処理

#### Returns

handler を解除するための関数

() => `void`

#### Example

```ts
const unsubscribe = registry.on("foo", handler);
unsubscribe(); // handler を解除
```

***

### onceAPI

> **onceAPI**: \<`Key`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:160](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L160)

一度だけ実行する HTTP API ハンドラを登録します。

ハンドラを登録する関数して、一度のみ実行する

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

登録するキー名

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`RequestData`](../type-aliases/RequestData.md)\>

実行する関数処理

#### Returns

() => `void`

#### Example

```ts
registry.once("foo", handler);
```

***

### onceEvent

> **onceEvent**: \<`Key`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:151](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L151)

一度だけ実行するイベントハンドラを登録します。

ハンドラを登録する関数して、一度のみ実行する

#### Type Parameters

##### Key

`Key` *extends* `"server/*:log"`

#### Parameters

##### type

`Key`

登録するキー名

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

実行する関数処理

#### Returns

() => `void`

#### Example

```ts
eventBus.once("foo", handler);
```

***

### onceWebSocket

> **onceWebSocket**: \<`Key`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:171](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L171)

一度だけ実行する WebSocket ハンドラを登録します。

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### Returns

() => `void`

***

### onEvent

> **onEvent**: \<`Key`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:149](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L149)

イベントハンドラを登録します。

ハンドラを登録する関数

#### Type Parameters

##### Key

`Key` *extends* `"server/*:log"`

#### Parameters

##### type

`Key`

登録するキー名

##### fn

`EventBusHandler`\<[`OutEventBusMap`](../type-aliases/OutEventBusMap.md)\[`Key`\]\>

実行する関数処理

#### Returns

handler を解除するための関数

() => `void`

#### Example

```ts
const unsubscribe = eventBus.on("foo", handler);
unsubscribe(); // handler を解除
```

***

### onWebSocket

> **onWebSocket**: \<`Key`\>(`type`, `fn`) => () => `void`

Defined in: [server-core/app/server.ts:169](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L169)

WebSocket ハンドラを登録します。

#### Type Parameters

##### Key

`Key` *extends* `string`

#### Parameters

##### type

`Key`

##### fn

[`ApiRegistryHandler`](../type-aliases/ApiRegistryHandler.md)\<[`WsHandler`](../type-aliases/WsHandler.md)\>

#### Returns

() => `void`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

Defined in: [server-core/app/server.ts:103](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L103)

`stop()` の別名です。

#### Returns

`Promise`\<`void`\>

***

### getHttpServer()

> **getHttpServer**(): `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `null`

Defined in: [server-core/app/server.ts:142](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L142)

基盤となる Node.js の HTTP サーバーを取得します。

#### Returns

`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `null`

***

### getPort()

> **getPort**(): `number`

Defined in: [server-core/app/server.ts:138](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L138)

現在設定されているポート番号を返します。

#### Returns

`number`

***

### isRunning()

> **isRunning**(): `boolean`

Defined in: [server-core/app/server.ts:134](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L134)

サーバーが起動中かを返します。

#### Returns

`boolean`

***

### listen()

> **listen**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [server-core/app/server.ts:59](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L59)

`start()` の別名です。

#### Parameters

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

***

### start()

> **start**(`options?`): `Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

Defined in: [server-core/app/server.ts:80](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L80)

HTTP サーバーを起動します。

`options` はコンストラクターで渡した設定を、この起動に限らず
上書きします。すでに起動済み、または起動処理中の場合は `undefined` を返します。

#### Parameters

##### options?

[`ServerStartOptions`](../type-aliases/ServerStartOptions.md)

起動時に上書きする設定。

#### Returns

`Promise`\<`Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\> \| `undefined`\>

起動した HTTP サーバー。すでに起動済みの場合は `undefined`。

#### Throws

ポートの確保や HTTP サーバーの起動に失敗した場合。

#### Example

```ts
await server.start({
  port: 3000,
  showQrCode: false,
});
```

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [server-core/app/server.ts:117](https://github.com/donneko/tyoi-api-node-server/blob/e72a58267f33c930a60b9d88a60b46a2e2fe77d4/src/server/server-core/app/server.ts#L117)

HTTP サーバーを停止し、既存の接続を終了します。

接続が 10 秒以内に閉じない場合は、残った接続を強制的に閉じます。
起動していない場合、または停止処理中の場合は何もしません。

#### Returns

`Promise`\<`void`\>

停止完了時に解決する Promise。

#### Throws

HTTP サーバーの停止に失敗した場合。
