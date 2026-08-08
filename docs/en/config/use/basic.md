# Basic configuration

## Use a configuration file

Place `tyoi.config.js` in the project root.

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    autoPort: true,
    publicDirname: "./public/main",
    apiPrefix: "/api",
    openBrowser: false,
});
```

```bash
tyoi run
```

The CLI sets `baseDirname` to the project directory. Therefore, `publicDirname` is normally specified relative to the project containing the configuration file.

## Configure programmatically

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    baseDirname: import.meta.dirname,
    publicDirname: "../public/main",
    apiPrefix: "/api",
    port: 3000,
    autoPort: true,
});

await app.start();
```

`baseDirname` is required when creating a server programmatically.

## Pass options only when starting

```ts
await app.start({
    port: 3001,
    autoPort: true,
    openBrowser: "local",
});
```

`start()` accepts `port`, `exposeLan`, `showQrCode`, `autoPort`, and `openBrowser`. Specify all other options in `tyoi()` / `new Server()` or the configuration file.
