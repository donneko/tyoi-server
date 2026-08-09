# Operate the server with the CLI

## Start the server

```bash
tyoi run
```

Running `tyoi` without a command behaves the same as `run`.

```bash
tyoi --port 3001
```

To override the port and open a browser, run:

```bash
tyoi run --port 3001 --open
```

## Inspect the active configuration

```bash
tyoi info
```

If multiple configuration files exist, `run` and `info` ask you to select the file to use interactively.

## Change the display language

```bash
tyoi setting language en-US
tyoi setting language ja-JP
```

The setting is saved to `.tyoi-server/config.json` in the directory where the command was run. The bundled languages are currently `ja-JP` and `en-US`.

## Help and version

```bash
tyoi help
tyoi --help
tyoi --version
```
