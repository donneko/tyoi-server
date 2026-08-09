# Features and limitations

## What you can do

- Register GET and POST JSON APIs with minimal code
- Register API keys for any HTTP method through `Server`
- Return an API handler result directly as the successful response
- Serve static files from the same HTTP server
- Register WebSocket handlers by path
- Provide APIs, pages, and WebSocket endpoints from the same process
- Add Express middleware
- Display local and network URLs
- Display a QR code for LAN access
- Find another port when the requested port is in use
- Stop HTTP and WebSocket connections on SIGINT / SIGTERM
- Create projects for different use cases from CLI templates

## Compatibility policy

The public TypeScript API and documented protocol remain backward compatible throughout v1.x. Backward-compatible additions and fixes may be released. The next breaking changes are reserved for v2.0.0.

## Current limitations

- For API registration paths, WebSocket registration paths, and public file URL paths, names whose first segment starts with `__tyoi` are reserved for internal use. Do not use paths such as `/__tyoi`, `/__tyoi-status`, or `/__tyoi_assets/...` in applications. When the API base is `/api`, `/api/__tyoi-status`, which corresponds to the registration path `/__tyoi-status`, is also reserved
- `ShortHandler` provides HTTP shortcuts only for `get()` and `post()`
- API paths use exact matching and do not support Express-style path parameters such as `/:id`
- There is no API for directly controlling the HTTP status, response headers, or streams from an API handler
- Authentication, authorization, CORS, TLS, rate limiting, and persistence are not built in
- Static serving has no SPA fallback; unmatched paths return the HTML 404 page
- WebSocket rooms, broadcasting, and message formats must be implemented by the application
- The CLI discovers only JavaScript configuration files, not TypeScript files
- Multiple `tyoi*.config.js` files are not merged; one file is selected

Use `middlewares` to provide missing HTTP behavior, and implement state management or authentication in the application.
