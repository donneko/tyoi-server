# Serve static files

## Specify a directory

```text
my-app/
├─ src/
│  └─ server.ts
└─ public/
   └─ main/
      ├─ index.html
      ├─ assets/app.js
      └─ assets/style.css
```

```ts
const app = tyoi({
    baseDirname: import.meta.dirname,
    publicDirname: "../public/main",
});

await app.start({ openBrowser: "local" });
```

Relative to `src/server.ts`, `../public/main` becomes the directory to serve.

```text
http://localhost:3000/                  → public/main/index.html
http://localhost:3000/assets/app.js     → public/main/assets/app.js
http://localhost:3000/assets/style.css  → public/main/assets/style.css
```

## Serve from a configuration file

A static site that does not need server code can start with only `tyoi.config.js`.

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    publicDirname: "./public/main",
    port: 3000,
    autoPort: true,
});
```

```bash
tyoi run --open
```

Use the `static-ts` template to try it immediately.

```bash
tyoi create website --template static-ts
```
