import { expectTypeOf, it } from "vitest";
import { Server } from "./server.js";

it("preserves typed API and WebSocket route names", () => {
    const server = new Server<"GET:/health", "/events">({ root: "." });

    expectTypeOf(server.onApi).parameter(0).toEqualTypeOf<"GET:/health">();
    expectTypeOf(server.onWebSocket).parameter(0).toEqualTypeOf<"/events">();
});
