# Static file serving behavior

Static files are served with Express's `express.static(publicDirectoryPath)`. `publicDirectoryPath` is resolved with `path.resolve(root, public)`.

## Routing order

```text
Custom middleware
  → JSON parser
  → APIs under api
  → static files
  → HTML 404
```

Therefore, an unregistered path under `api` returns the API's JSON 404 response and does not fall through to a static file at the same path. Other unmatched paths return the localized HTML 404 page.

## Directory resolution

- A relative `public` is resolved from `root`.
- An absolute `public` is used as-is by `path.resolve()`.
- When the CLI finds a configuration file, it uses the current working directory as `root`.
- The programmatic API requires an explicit `root`.

## Supported behavior

- Standard file serving and directory `index.html` resolution follow Express behavior.
- Directory listings are not generated.
- There is no SPA fallback from arbitrary paths to `index.html`.
- tyoi-server has no configuration property for custom cache control or additional headers. Use `middlewares` when needed.

## Exposure warning

With `lan: true`, devices on the LAN can retrieve content from the served directory. Do not place files that should remain private—such as private keys, environment variables, or source maps—in `public`.
