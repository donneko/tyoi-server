# CLI command reference

| Command | Arguments | Behavior |
| --- | --- | --- |
| `tyoi` | None | Same as `run`; also handles `--help` and `--version` |
| `tyoi create [name]` | Project name | Creates `<cwd>/<name>/` and copies a project template |
| `tyoi init [name]` | Project name | Copies a project template into the current directory |
| `tyoi config [name]` | Project name | Copies a configuration template into the current directory |
| `tyoi run` | None | Finds a configuration file and starts the server |
| `tyoi info` | None | Displays the configuration produced from the file and CLI options |
| `tyoi setting <key> <value>` | Setting key and value | Saves CLI settings to `.tyoi-server/config.json` |
| `tyoi help` | None | Displays the command list |
| `tyoi dev` | None | Starts the server with the package's own development configuration |

`dev` is intended for development checks in the tyoi-server repository. In a generated application, use the template's `npm run dev` script or `tyoi run`.

## Project names

Valid names match this regular expression:

```text
^[a-zA-Z0-9-]+$
```

If you omit the name, the CLI uses the current directory name as the initial value and prompts for input.

## Configuration file discovery

`run` and `info` search the current directory and all directories under `config/` for JavaScript files with these names:

```text
tyoi.config.js
tyoi.<name>.config.js
```

`<name>` may contain letters, numbers, and periods. The `config/` directory is searched recursively. TypeScript configuration files are not loaded. If multiple files are found, the CLI asks you to choose from a sorted list.
