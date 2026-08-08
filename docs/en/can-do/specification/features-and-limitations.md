# Features and limitations

## What you can do

- Register GET and POST JSON APIs with minimal code
- Register API keys for any HTTP method through `Server`
- Serve static files from the same HTTP server
- Register WebSocket handlers by path
- Provide APIs, pages, and WebSocket endpoints from the same process
- Add Express middleware
- Display local and network URLs
- Display a QR code for LAN access
- Find another port when the requested port is in use
- Stop HTTP and WebSocket connections on SIGINT / SIGTERM
- Create projects for different use cases from CLI templates

## Current limitations

- The package is experimental, so the public API may change in the future
- `ShortHandler` provides HTTP shortcuts only for `get()` and `post()`
- API paths use exact matching and do not support Express-style path parameters such as `/:id`
- There is no API for directly controlling the HTTP status, response headers, or streams from an API handler
- Successful API responses are wrapped in `{ ok: true, data }`
- Authentication, authorization, CORS, TLS, rate limiting, and persistence are not built in
- Static serving has no SPA fallback; unmatched paths return the HTML 404 page
- WebSocket rooms, broadcasting, and message formats must be implemented by the application
- The CLI discovers only JavaScript configuration files, not TypeScript files
- Multiple `tyoi*.config.js` files are not merged; one file is selected

Use `middlewares` to provide missing HTTP behavior, and implement state management or authentication in the application.
