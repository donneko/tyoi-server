# tyoi-server

[日本語](./README.md) | [English](./README.en.md)

![NPM Version](https://img.shields.io/npm/v/%40donneko%2Ftyoi-server) ![NPM License](https://img.shields.io/npm/l/%40donneko%2Ftyoi-server)

An Express-based API and static file server framework for local development. Create templates for different use cases from the CLI and use HTTP APIs, WebSocket endpoints, static file serving, and LAN access.

> This project is experimental. The API may change in future releases.

## Quick start

Node.js 20.14 or later is required.

```bash
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-js
npm install
npm run
```

After startup, open the displayed local URL in your browser. See the [quick start](./docs/en/quick-start/use/getting-started.md) for details.

## Documentation by topic

- [API usage](./docs/en/api/use/http-api.md) / [API specification](./docs/en/api/specification/short-handler.md)
- [CLI usage](./docs/en/command/use/project-creation.md) / [CLI specification](./docs/en/command/specification/commands.md)
- [Configuration usage](./docs/en/config/use/basic.md) / [Configuration reference](./docs/en/config/specification/options.md)
- [Template examples](./docs/en/example/use/templates.md) / [Template reference](./docs/en/example/specification/template-catalog.md)
- [Practical recipes](./docs/en/can-do/use/recipes.md) / [Features and limitations](./docs/en/can-do/specification/features-and-limitations.md)
- [Static file usage](./docs/en/public/use/static-files.md) / [Serving behavior](./docs/en/public/specification/routing.md)
- [v1 migration guide](./docs/en/migration-v1.md)
- [Generated API reference](./docs/en/api/reference/index.md)

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
