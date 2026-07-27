import type { ApiProcessContext } from "../../../types/context/setup-express/stop-express.type.js";
import type express from "express";

export async function apiProcess(
    req: express.Request,
    res: express.Response,
    context: ApiProcessContext
) {
    try {
        const key = `${req.method}:${req.path}`;

        if (!context.serverAPIs.has(key)) {
            res.status(404).json({
                ok: false,
                code: "API_NOT_FOUND",
                message: "API not found",
            });
            return;
        }

        const result = await context.serverAPIs.emit(key, {
            query: req.query,
            body: req.body,
            headers: req.headers,
        });

        res.json({
            ok: true,
            data: result,
        });
    } catch {
        res.status(500).json({
            ok: false,
            code: "API_INTERNAL_ERROR",
            message: "Internal server error",
        });
    }
}
