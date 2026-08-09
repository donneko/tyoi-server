# Requirements and generated structure

## Runtime requirements

| Item | Requirement |
| --- | --- |
| Node.js | 20.14 or later |
| Module format | ESM (`"type": "module"`) |
| Package | `@donneko/tyoi-server` |
| CLI executable | `tyoi` |

## Compatibility policy

The public TypeScript API and documented protocol remain backward compatible throughout v1.x. Backward-compatible additions and fixes may be released. The next breaking changes are reserved for v2.0.0.

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
