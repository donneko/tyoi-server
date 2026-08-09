# tyoi-server

[日本語](./README.md) | [English](./README.en.md)

![NPM Version](https://img.shields.io/npm/v/%40donneko%2Ftyoi-server) ![NPM License](https://img.shields.io/npm/l/%40donneko%2Ftyoi-server)

An Express-based API and static file server framework for local development. Create templates for different use cases from the CLI and use HTTP APIs, WebSocket endpoints, static file serving, and LAN access.

The public TypeScript API and documented protocol remain backward compatible throughout v1.x. Backward-compatible additions and fixes may be released. The next breaking changes are reserved for v2.0.0.

## Quick start

Node.js 20.14 or later is required.

```bash
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-js
npm install
npm run dev
```

After startup, open the displayed local URL in your browser. See the [quick start](https://donneko.github.io/tyoi-server/en/quick-start/use/getting-started.html) for details.

## Documentation by topic

- [API usage](https://donneko.github.io/tyoi-server/en/api/use/http-api.html) / [API specification](https://donneko.github.io/tyoi-server/en/api/specification/short-handler.html)
- [CLI usage](https://donneko.github.io/tyoi-server/en/command/use/project-creation.html) / [CLI specification](https://donneko.github.io/tyoi-server/en/command/specification/commands.html)
- [Configuration usage](https://donneko.github.io/tyoi-server/en/config/use/basic.html) / [Configuration reference](https://donneko.github.io/tyoi-server/en/config/specification/options.html)
- [Template examples](https://donneko.github.io/tyoi-server/en/example/use/templates.html) / [Template reference](https://donneko.github.io/tyoi-server/en/example/specification/template-catalog.html)
- [Practical recipes](https://donneko.github.io/tyoi-server/en/can-do/use/recipes.html) / [Features and limitations](https://donneko.github.io/tyoi-server/en/can-do/specification/features-and-limitations.html)
- [Static file usage](https://donneko.github.io/tyoi-server/en/public/use/static-files.html) / [Serving behavior](https://donneko.github.io/tyoi-server/en/public/specification/routing.html)
- [v1 migration guide](https://donneko.github.io/tyoi-server/en/migration-v1.html)
- [Generated API reference](https://donneko.github.io/tyoi-server/en/api/reference/)

## Minimal programmatic example

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public",
    api: "/api",
    port: 3000,
});

app.get("/hello", () => ({ message: "Hello Tyoi!" }));
await app.start();
```

With the default configuration, this API is available at `GET /api/hello`.

## License

MIT
