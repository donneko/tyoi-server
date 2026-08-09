# @donneko/tyoi-server

Tyoi のプログラム API。 / Tyoi programmatic API.

`Server` は低レベル API、`tyoi()` は API 登録を簡潔に行うための
ショートハンド、`defineConfig()` は CLI 用設定を検証するために使います。

`Server` is the low-level API, `tyoi()` is a shorthand for registering APIs,
and `defineConfig()` validates configuration used by the CLI.

## Classes

- [HandlerRegistry](classes/HandlerRegistry.md)
- [Server](classes/Server.md)
- [ShortHandler](classes/ShortHandler.md)

## Type Aliases

- [BrowserTarget](type-aliases/BrowserTarget.md)
- [EventBusHandler](type-aliases/EventBusHandler.md)
- [Handler](type-aliases/Handler.md)
- [LoggerCreateData](type-aliases/LoggerCreateData.md)
- [OutEventBusMap](type-aliases/OutEventBusMap.md)
- [RequestData](type-aliases/RequestData.md)
- [RequestEventMap](type-aliases/RequestEventMap.md)
- [ServerConfig](type-aliases/ServerConfig.md)
- [ServerOptions](type-aliases/ServerOptions.md)
- [StartOptions](type-aliases/StartOptions.md)
- [WsHandler](type-aliases/WsHandler.md)

## Functions

- [defineConfig](functions/defineConfig.md)
- [tyoi](functions/tyoi.md)
