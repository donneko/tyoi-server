import type { ServerContext } from "../integration/server.type.js";

export type ServerStopContext = CreateFinishContext & OffSignalStopContext;

export type CreateFinishContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

// TODO stopのハンドラーをどうやって渡すか考える
export type OffSignalStopContext = Pick<ServerContext, "expressServer">;
