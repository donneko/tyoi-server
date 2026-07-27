import type { SetupDefaultMiddlewareContext } from "../../../types/context/setup-express/stop-express.type.js";
import express from "express";

export function setupDefaultMiddleware(context: SetupDefaultMiddlewareContext) {
    context.expressServer.use(express.json());
}
