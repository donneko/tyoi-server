# Try templates by use case

## Basic API and WebSocket

```bash
tyoi create basic-app --template basic-ts
cd basic-app
npm install
npm run dev
```

`basic-ts` includes a static page, `GET /api/hello`, `POST /api/echo`, and a WebSocket echo endpoint at `/ws`. Choose `basic-js` to use JavaScript.

## Static site

```bash
tyoi create website --template static-ts
cd website
npm install
npm run dev
```

Edit the HTML, CSS, and JavaScript under `public/main/`. There is no server source code; the site is served using `tyoi.config.js` and `tyoi run`.

## JSON API

```bash
tyoi create task-api --template api-ts
cd task-api
npm install
npm run dev
```

Example requests:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/tasks
curl -X POST http://localhost:3000/api/tasks \
  -H "content-type: application/json" \
  -d '{"title":"First task"}'
```

Data is kept in memory and resets when the process restarts.

## Real-time application

```bash
tyoi create chat-app --template realtime-ts
cd chat-app
npm install
npm run dev
```

Open the page in multiple browser tabs to share messages and the connection count through `/ws`.
