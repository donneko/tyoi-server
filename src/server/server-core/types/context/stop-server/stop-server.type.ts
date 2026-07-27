import type { ServerContext } from "../integration/server.type.js";

export type ServerStopContext = Pick<
    ServerContext,
    "webSocketRouter" | "serverLogger" | "systemMetaManager"
> &
    CreateFinishContext &
    OffSignalStopContext;

export type CreateFinishContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type OffSignalStopContext = Pick<ServerContext, "stopHandler">;
