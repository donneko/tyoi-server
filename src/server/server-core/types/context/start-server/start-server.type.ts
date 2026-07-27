import type { ServerContext } from "../integration/server.type.js";

export type ServerStartContext = ServerCreateHttpServerContext &
    ServerSummaryContext &
    ServerOpenBrowserContext &
    CreateServerConfigContext &
    SetupSignalStopContext &
    UpdatePortContext &
    ServerStartCatchErrorContext;

export type ServerCreateHttpServerContext<WebSocketNameList extends string = string> = Pick<
    ServerContext<WebSocketNameList>,
    "expressServer" | "webSocketRouter"
>;

export type ServerSummaryContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type ServerOpenBrowserContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type CreateServerConfigContext = Pick<ServerContext, "serverConfig" | "serverRegister"> &
    FindAvailablePortContext;

export type FindAvailablePortContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type SetupSignalStopContext = Pick<ServerContext, "stopHandler">;

export type UpdatePortContext = Pick<ServerContext, "serverConfig">;

export type ServerStartCatchErrorContext = Pick<
    ServerContext,
    "serverLogger" | "systemMetaManager" | "innerEventBus"
>;
