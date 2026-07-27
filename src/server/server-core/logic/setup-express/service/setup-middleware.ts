import type { SetupMiddlewareContext } from "../../../types/context/setup-express/stop-express.type.js";
import type express from "express";

export function setupMiddleware(
    middlewares: express.RequestHandler[],
    context: SetupMiddlewareContext
) {
    for (const ware of middlewares) {
        context.expressServer.use(ware);
    }
}
