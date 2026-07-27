import type { ServerContext } from "../integration/server.type.js";

export type ServerStopContext = CreateServerConfigContext & SetupPublicPathContext;

export type CreateServerConfigContext = Pick<ServerContext, "serverConfig">;

export type SetupPublicPathContext = Pick<ServerContext, "serverRegister">;
