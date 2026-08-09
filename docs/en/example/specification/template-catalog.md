# Template catalog

## Project templates

| Name | Language | Start command | Included examples |
| --- | --- | --- | --- |
| `basic-ts` | TypeScript | `tsx watch src/server.ts` | Static page, GET, POST, WebSocket, morgan |
| `basic-js` | JavaScript | `node --watch src/server.js` | JavaScript equivalent of `basic-ts` |
| `static-ts` | HTML / CSS / JavaScript | `tyoi run --open` | Static site, 404 page, browser JavaScript type checking |
| `api-ts` | TypeScript | `tsx watch src/server.ts` | Health endpoint, task listing and creation, input validation, in-memory store |
| `realtime-ts` | TypeScript | `tsx watch src/server.ts` | WebSocket chat, connection management, message validation |

All templates require Node.js 20.14 or later and use ESM. The package name in `package.json` and the tyoi-server version are replaced when the project is generated.

## Configuration templates

| Name | Output | Main settings |
| --- | --- | --- |
| `basic` | `tyoi.config.js` | port, autoPort, public, api, LAN, QR code, browser, morgan |

## Common scripts

TypeScript server templates provide `dev`, `typecheck` or `build`, and `start`. `static-ts` has no server code to compile and starts directly with `tyoi run`.

If a template file already exists at the destination, review the copy result before using it. The `create` command itself rejects an existing destination directory.
