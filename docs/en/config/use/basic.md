# Basic configuration

## Use a configuration file

Place `tyoi.config.js` in the project root.

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    autoPort: true,
    public: "./public/main",
    api: "/api",
    browser: false,
});
```

```bash
tyoi run
```

The CLI sets `root` to the project directory. Therefore, `public` is normally specified relative to the project containing the configuration file.

## Configure programmatically

```ts
import { tyoi } from "@donneko/tyoi-server";

const app = tyoi({
    root: import.meta.dirname,
    public: "../public/main",
    api: "/api",
    port: 3000,
    autoPort: true,
});

await app.start();
```

`root` is required when creating a server programmatically.

## Enable the management GUI

Set `gui: true` to view the server summary, status, and latest logs at `/__tyoi/`. See [Built-in management GUI](./management-gui.md) for examples, management endpoints, and LAN security notes.

## Pass options only when starting

```ts
await app.start({
    port: 3001,
    autoPort: true,
    browser: "local",
});
```

`start()` accepts `port`, `lan`, `qr`, `autoPort`, and `browser`. Specify all other options in `tyoi()` / `new Server()` or the configuration file.
