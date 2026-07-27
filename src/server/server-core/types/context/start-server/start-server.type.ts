import type { ServerContext } from "../integration/server.type.js";

export type ServerStartContext = ServerCreateHttpServerContext &
    ServerSummaryContext &
    ServerOpenBrowserContext &
    CreateServerConfigContext &
    FindAvailablePortContext &
    SetupSignalStopContext &
    UpdatePortContext &
    ServerStartCatchErrorContext;

export type ServerCreateHttpServerContext<WebSocketNameList extends string = string> = Pick<
    ServerContext<WebSocketNameList>,
    "expressServer" | "webSocketRouter"
>;

export type ServerSummaryContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type ServerOpenBrowserContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type CreateServerConfigContext = Pick<ServerContext, "serverConfig" | "serverRegister">;

export type FindAvailablePortContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

// TODO stopのハンドラーをどうやって渡すか考える
export type SetupSignalStopContext = Pick<ServerContext, "expressServer">;

export type UpdatePortContext = Pick<ServerContext, "serverConfig">;

export type ServerStartCatchErrorContext = Pick<
    ServerContext,
    "serverLogger" | "systemMetaManager" | "innerEventBus"
>;
