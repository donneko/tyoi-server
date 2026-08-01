import type { ServerContext } from "../integration/server.type.js";

export type ServerStopContext = Pick<
    ServerContext,
    "webSocketRouter" | "serverLogger" | "messageManager"
> &
    CreateFinishContext &
    OffSignalStopContext;

export type CreateFinishContext = Pick<ServerContext, "serverLogger" | "messageManager">;

export type OffSignalStopContext = Pick<ServerContext, "stopHandler">;
