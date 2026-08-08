[@donneko/tyoi-server](../index.md) / HandlerRegistry

# クラス: HandlerRegistry\<HandlerRegistryMap\>

定義: [server-core/util/api-registry.ts:5](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L5)

キーごとに1つのハンドラを管理します。 / Stores one handler for each key.

## 型パラメーター

### HandlerRegistryMap

`HandlerRegistryMap` *extends* `Record`\<`string`, `unknown`\>

## コンストラクター

### コンストラクター

> **new HandlerRegistry**\<`HandlerRegistryMap`\>(): `HandlerRegistry`\<`HandlerRegistryMap`\>

#### 戻り値

`HandlerRegistry`\<`HandlerRegistryMap`\>

## メソッド

### emit()

> **emit**\<`Key`\>(`type`, `arg`): `Promise`\<`unknown`\>

定義: [server-core/util/api-registry.ts:74](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L74)

キー名で登録されたハンドラを実行します。 / Invokes the handler registered for a key.

#### 型パラメーター

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### パラメータ

##### type

`Key`

実行するキー名。 / Key to invoke.

##### arg

`HandlerRegistryMap`\[`Key`\]

ハンドラに渡す引数。 / Argument passed to the handler.

#### 戻り値

`Promise`\<`unknown`\>

#### 例

```ts
registry.emit("foo",arg);
```

***

### has()

> **has**(`type`): `type is Extract<keyof HandlerRegistryMap, string>`

定義: [server-core/util/api-registry.ts:53](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L53)

ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.

#### パラメータ

##### type

`string`

調べるキー名。 / Key to check.

#### 戻り値

`type is Extract<keyof HandlerRegistryMap, string>`

存在する場合は `true`。 / `true` when a handler exists.

#### 例

```ts
console.log(registry.has("foo"));
```

***

### off()

> **off**\<`Key`\>(`type`): `void`

定義: [server-core/util/api-registry.ts:63](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L63)

ハンドラの登録を解除します。 / Unregisters a handler.

#### 型パラメーター

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

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

### on()

> **on**\<`KEY`\>(`type`, `fn`): () => `void`

定義: [server-core/util/api-registry.ts:17](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L17)

ハンドラを登録します。 / Registers a handler.

#### 型パラメーター

##### KEY

`KEY` *extends* `string` \| `number` \| `symbol`

#### パラメータ

##### type

`KEY`

登録するキー名。 / Key to register.

##### fn

[`Handler`](../type-aliases/Handler.md)\<`HandlerRegistryMap`\[`KEY`\]\>

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

### once()

> **once**\<`Key`\>(`type`, `fn`): () => `void`

定義: [server-core/util/api-registry.ts:38](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L38)

一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.

#### 型パラメーター

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### パラメータ

##### type

`Key`

登録するキー名。 / Key to register.

##### fn

[`Handler`](../type-aliases/Handler.md)\<`HandlerRegistryMap`\[`Key`\]\>

実行するハンドラ。 / Handler to invoke.

#### 戻り値

() => `void`

#### 例

```ts
registry.once("foo", handler);
```
