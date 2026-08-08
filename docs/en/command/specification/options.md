# CLI option reference

| Option | Short form | Value | Main commands | Behavior |
| --- | --- | --- | --- | --- |
| `--template` | None | String | `create`, `init`, `config` | Template name to use |
| `--port` | `-p` | Number | `run`, `dev`, default command | Overrides the listening port |
| `--open` | `-o` | Flag | `run`, `dev`, default command | Opens a browser as if `openBrowser: true` were set |
| `--help` | `-h` | Flag | Default command | Displays help and exits |
| `--version` | `-v` | Flag | Default command | Displays the package version and exits |

## Configuration precedence

CLI options are applied after the loaded `tyoi*.config.js`, so a CLI option takes precedence when both specify the same property. The CLI sets `baseDirname` last.

```text
Default configuration
  → tyoi*.config.js
  → CLI options
  → baseDirname determined by the CLI
```

`--open` opens the local URL. There is no CLI option for selecting the network URL directly, so set `openBrowser: "network"` in the configuration file.
