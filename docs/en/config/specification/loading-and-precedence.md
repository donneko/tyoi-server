# Configuration loading and precedence

## Programmatic API

Configuration is resolved in the following order. Each later source overrides matching keys from the previous one.

```text
Built-in defaults
  → tyoi(options) / new Server(options)
  → start(options)
  → actual port selected during startup
```

`start(options)` updates the configuration manager, so `getConfig()` on that instance returns the updated values.

## CLI

`tyoi run` resolves configuration in this order:

```text
Built-in defaults
  → selected tyoi*.config.js
  → language from .tyoi-server/config.json
  → CLI options
  → root set by the CLI
  → actual port selected during startup
```

## Configuration file locations

```text
my-app/
├─ tyoi.config.js
└─ config/
   ├─ tyoi.dev.config.js
   └─ environments/
      └─ tyoi.lan.config.js
```

The CLI searches the current directory and all directories under `config/`. It supports ESM JavaScript files.

```js
import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    public: "./public/main",
});
```

Configuration files are not merged automatically. If multiple files are found, you select one file for each run.
