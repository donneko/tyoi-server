# Static file serving behavior

Static files are served with Express's `express.static(publicDirectoryPath)`. `publicDirectoryPath` is resolved with `path.resolve(baseDirname, publicDirname)`.

## Routing order

```text
Custom middleware
  → JSON parser
  → APIs under apiPrefix
  → static files
  → HTML 404
```

Therefore, an unregistered path under `apiPrefix` returns the API's JSON 404 response and does not fall through to a static file at the same path. Other unmatched paths return the localized HTML 404 page.

## Directory resolution

- A relative `publicDirname` is resolved from `baseDirname`.
- An absolute `publicDirname` is used as-is by `path.resolve()`.
- When the CLI finds a configuration file, it uses the current working directory as `baseDirname`.
- The programmatic API requires an explicit `baseDirname`.

## Supported behavior

- Standard file serving and directory `index.html` resolution follow Express behavior.
- Directory listings are not generated.
- There is no SPA fallback from arbitrary paths to `index.html`.
- tyoi-server has no configuration property for custom cache control or additional headers. Use `middlewares` when needed.

## Exposure warning

With `exposeLan: true`, devices on the LAN can retrieve content from the served directory. Do not place files that should remain private—such as private keys, environment variables, or source maps—in `publicDirname`.
