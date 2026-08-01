import type { ServerContext } from "../integration/server.type.js";

export type ServerSetupContext = CreateServerConfigContext &
    SetupPublicPathContext &
    SetupLanguagesContext;

export type CreateServerConfigContext = Pick<ServerContext, "serverConfig">;

export type SetupPublicPathContext = Pick<ServerContext, "serverRegister">;

export type SetupLanguagesContext = Pick<ServerContext, "serverConfig" | "messageManager">;
