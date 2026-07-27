import type { ServerCreateExpressConfigReturn } from "../../../types/server.type.js";
import type {
    CreateExpressConfigContext,
    SetupMiddlewareContext,
    SetupDefaultMiddlewareContext,
    SetupApiProcessContext,
    ApiProcessContext,
    SetupStaticFileContext,
} from "../../context/setup-express/stop-express.type.js";
import express from "express";

export type SetupExpressDependencies = {
    createExpressConfig: CreateExpressConfig;
    setupMiddleware: SetupMiddleware;
    setupDefaultMiddleware: SetupDefaultMiddleware;
    setupApiProcess: SetupApiProcess;
    setupStaticFile: SetupStaticFile;
};

export type CreateExpressConfig = (
    context: CreateExpressConfigContext
) => ServerCreateExpressConfigReturn;

export type SetupMiddleware = (
    middlewares: express.RequestHandler[],
    context: SetupMiddlewareContext
) => void;

export type SetupDefaultMiddleware = (context: SetupDefaultMiddlewareContext) => void;

export type SetupApiProcess = (
    apiPrefix: string,
    context: SetupApiProcessContext,
    dependencies?: Partial<SetupApiProcessDependencies>
) => void;

export type SetupApiProcessDependencies = {
    apiProcess: ApiProcess;
};

export type ApiProcess = (
    req: express.Request,
    res: express.Response,
    context: ApiProcessContext
) => void;

export type SetupStaticFile = (
    publicDirectoryPath: string,
    context: SetupStaticFileContext
) => void;
