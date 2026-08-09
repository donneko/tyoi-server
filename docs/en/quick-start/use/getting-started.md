# Getting started

## Requirements

- Node.js 20.14 or later
- npm

## Create a TypeScript project

```bash
npm install @donneko/tyoi-server
npx tyoi create my-app --template basic-ts
cd my-app
npm install
npm run dev
```

Open the Local URL shown in the terminal. The generated project includes a minimal static page, GET and POST APIs, and a WebSocket example.

The following endpoints are available:

```text
GET  /api/hello
POST /api/echo
WS   /ws
```

For example, check the GET API with:

```bash
curl http://localhost:3000/api/hello
```

## Start with JavaScript

```bash
npm install @donneko/tyoi-server
npx tyoi create my-app --template basic-js
cd my-app
npm install
npm run dev
```

The project structure is the same as the TypeScript version, but the server is implemented in JavaScript.

## Create a project in the current directory

`init` copies a template into the current directory without creating a child directory.

```bash
mkdir my-app
cd my-app
npm install @donneko/tyoi-server
npx tyoi init my-app --template basic-ts
npm install
npm run dev
```

## Next steps

- Add an HTTP API: [Build an HTTP API](/en/api/use/http-api)
- Serve static files: [Serve static files](/en/public/use/static-files)
- Change configuration: [Basic configuration](/en/config/use/basic)
- Choose a template: [Template catalog](/en/example/specification/template-catalog)
