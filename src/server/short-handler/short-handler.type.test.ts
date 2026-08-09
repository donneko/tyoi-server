import { expectTypeOf, it } from "vitest";
import { Server } from "../server-core/index.js";
import { ShortHandler, tyoi } from "./short-handler.js";

type ApiKeys = "GET:/health" | "POST:/users" | "PATCH:/users";
type WebSocketKeys = "/events" | "/notifications";

it("preserves typed API and WebSocket route names", () => {
    const app = tyoi<ApiKeys, WebSocketKeys>({ root: "." });

    expectTypeOf(app.get).parameter(0).toEqualTypeOf<"/health">();
    expectTypeOf(app.post).parameter(0).toEqualTypeOf<"/users">();
    expectTypeOf(app.ws).parameter(0).toEqualTypeOf<WebSocketKeys>();
    expectTypeOf(app.server).toEqualTypeOf<Server<ApiKeys, WebSocketKeys>>();

    if (app.server.isRunning()) {
        // @ts-expect-error POST keys cannot be registered through get().
        app.get("/users", () => undefined);
        // @ts-expect-error GET keys cannot be registered through post().
        app.post("/health", () => undefined);
        // @ts-expect-error Unlisted WebSocket paths cannot be registered.
        app.ws("/missing", () => undefined);
    }
});

it("keeps string routes when type parameters are omitted", () => {
    const app = tyoi({ root: "." });

    expectTypeOf(app.get).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(app.post).parameter(0).toEqualTypeOf<string>();
    expectTypeOf(app.ws).parameter(0).toEqualTypeOf<string>();
});

it("infers route names from a typed Server", () => {
    const app = new ShortHandler(new Server<ApiKeys, WebSocketKeys>({ root: "." }));

    expectTypeOf(app.get).parameter(0).toEqualTypeOf<"/health">();
    expectTypeOf(app.post).parameter(0).toEqualTypeOf<"/users">();
    expectTypeOf(app.ws).parameter(0).toEqualTypeOf<WebSocketKeys>();
});
