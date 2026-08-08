# Requirements and generated structure

## Runtime requirements

| Item | Requirement |
| --- | --- |
| Node.js | 20.14 or later |
| Module format | ESM (`"type": "module"`) |
| Package | `@donneko/tyoi-server` |
| CLI executable | `tyoi` |

The package is experimental, and its public API may change in future releases.

## Difference between `create` and `init`

| Command | Destination | Existing directory behavior |
| --- | --- | --- |
| `tyoi create <name>` | `<name>/` under the current directory | Fails if a directory with the same name exists |
| `tyoi init <name>` | Current directory | Does not create a new child directory |

Project names may contain letters, numbers, and hyphens. If the name is omitted, the CLI prompts for one.

## Basic TypeScript template

`basic-ts` generates approximately the following structure:

```text
my-app/
├─ package.json
├─ tsconfig.json
├─ tyoi.config.js
├─ src/
│  └─ server.ts
└─ public/
   └─ main/
      └─ index.html
```

`npm run dev` runs `tsx watch src/server.ts`, `npm run build` runs `tsc`, and `npm start` runs the compiled `dist/server.js`.
