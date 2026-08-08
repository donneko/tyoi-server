[@donneko/tyoi-server](../index.md) / HandlerRegistry

# Class: HandlerRegistry\<HandlerRegistryMap\>

Defined in: [server-core/util/api-registry.ts:5](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L5)

キーごとに1つのハンドラを管理します。 / Stores one handler for each key.

## Type Parameters

### HandlerRegistryMap

`HandlerRegistryMap` *extends* `Record`\<`string`, `unknown`\>

## Constructors

### Constructor

> **new HandlerRegistry**\<`HandlerRegistryMap`\>(): `HandlerRegistry`\<`HandlerRegistryMap`\>

#### Returns

`HandlerRegistry`\<`HandlerRegistryMap`\>

## Methods

### emit()

> **emit**\<`Key`\>(`type`, `arg`): `Promise`\<`unknown`\>

Defined in: [server-core/util/api-registry.ts:74](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L74)

キー名で登録されたハンドラを実行します。 / Invokes the handler registered for a key.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`Key`

実行するキー名。 / Key to invoke.

##### arg

`HandlerRegistryMap`\[`Key`\]

ハンドラに渡す引数。 / Argument passed to the handler.

#### Returns

`Promise`\<`unknown`\>

#### Example

```ts
registry.emit("foo",arg);
```

***

### has()

> **has**(`type`): `type is Extract<keyof HandlerRegistryMap, string>`

Defined in: [server-core/util/api-registry.ts:53](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L53)

ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.

#### Parameters

##### type

`string`

調べるキー名。 / Key to check.

#### Returns

`type is Extract<keyof HandlerRegistryMap, string>`

存在する場合は `true`。 / `true` when a handler exists.

#### Example

```ts
console.log(registry.has("foo"));
```

***

### off()

> **off**\<`Key`\>(`type`): `void`

Defined in: [server-core/util/api-registry.ts:63](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L63)

ハンドラの登録を解除します。 / Unregisters a handler.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`Key`

解除するキー名。 / Key to unregister.

#### Returns

`void`

#### Example

```ts
registry.off("foo");
```

***

### on()

> **on**\<`KEY`\>(`type`, `fn`): () => `void`

Defined in: [server-core/util/api-registry.ts:17](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L17)

ハンドラを登録します。 / Registers a handler.

#### Type Parameters

##### KEY

`KEY` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`KEY`

登録するキー名。 / Key to register.

##### fn

[`Handler`](../type-aliases/Handler.md)\<`HandlerRegistryMap`\[`KEY`\]\>

実行するハンドラ。 / Handler to invoke.

#### Returns

ハンドラを解除するための関数。 / A function that unregisters the handler.

() => `void`

#### Example

```ts
const unsubscribe = registry.on("foo", handler);
unsubscribe(); // ハンドラを解除 / Unregister the handler
```

***

### once()

> **once**\<`Key`\>(`type`, `fn`): () => `void`

Defined in: [server-core/util/api-registry.ts:38](https://github.com/donneko/tyoi-api-node-server/blob/main/src/server/server-core/util/api-registry.ts#L38)

一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.

#### Type Parameters

##### Key

`Key` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`Key`

登録するキー名。 / Key to register.

##### fn

[`Handler`](../type-aliases/Handler.md)\<`HandlerRegistryMap`\[`Key`\]\>

実行するハンドラ。 / Handler to invoke.

#### Returns

() => `void`

#### Example

```ts
registry.once("foo", handler);
```
