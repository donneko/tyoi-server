import type { ApiProcessContext } from "../../../types/context/setup-express/stop-express.type.js";
import type express from "express";
import { isApiResponse } from "../../../service/api-response.js";

export async function apiProcess(
    req: express.Request,
    res: express.Response,
    context: ApiProcessContext
) {
    try {
        const route = context.apiRegistry.find(req.method, req.path);

        if (!route) {
            const allowedMethods = context.apiRegistry.allowedMethods(req.path);
            if (allowedMethods.length > 0) {
                res.set("Allow", allowedMethods.join(", "));
                res.status(405).json({
                    code: "API_METHOD_NOT_ALLOWED",
                    message: context.messageManager.message("http.api.methodNotAllowed"),
                });
                return;
            }

            res.status(404).json({
                code: "API_NOT_FOUND",
                message: context.messageManager.message("http.api.notFound"),
            });
            return;
        }

        const result = await context.apiRegistry.emit(route.key, {
            query: req.query,
            body: req.body,
            headers: req.headers,
            params: route.params,
        });

        if (isApiResponse(result)) {
            res.status(result.status).json(result.body);
            return;
        }

        res.json(result);
    } catch {
        res.status(500).json({
            code: "API_INTERNAL_ERROR",
            message: context.messageManager.message("http.api.internalError"),
        });
    }
}
