import type { ServerContext } from "../integration/server.type.js";

export type ServerExpressContext = CreateExpressConfigContext &
    CreateExpressConfigContext &
    SetupMiddlewareContext &
    SetupDefaultMiddlewareContext &
    SetupApiProcessContext &
    SetupStaticFileContext;

export type CreateExpressConfigContext = Pick<ServerContext, "serverConfig" | "serverRegister">;

export type SetupMiddlewareContext = Pick<ServerContext, "expressServer">;

export type SetupDefaultMiddlewareContext = Pick<ServerContext, "expressServer">;

export type SetupApiProcessContext = Pick<ServerContext, "expressServer"> & ApiProcessContext;

export type ApiProcessContext = Pick<ServerContext, "serverAPIs">;

export type SetupStaticFileContext = Pick<ServerContext, "expressServer" | "httpMetaManager">;
