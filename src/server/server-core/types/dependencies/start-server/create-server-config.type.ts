import type {
    CreateServerConfigContext,
    FindAvailablePortContext,
} from "../../context/start-server/start-server.type.js";
import type { ServerStartOptions } from "../../../types/server.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import type { ServerStartFindPortArgs } from "../../../types/server.type.js";
import type net from "node:net";

export type CreateServerConfig = (
    options: ServerStartOptions,
    context: CreateServerConfigContext,
    dependencies?: Partial<CreateServerConfigDependencies>
) => Promise<ServerStartUseConfig>;

export type CreateServerConfigDependencies = {
    findAvailablePort: FindAvailablePort;
};

export type FindAvailablePort = (
    findPortArgs: ServerStartFindPortArgs,
    context: FindAvailablePortContext,
    dependencies?: Partial<FindAvailablePortDependencies>
) => Promise<number>;

export type FindAvailablePortDependencies = {
    askPermission: (message: string) => Promise<boolean>;
    isPortUsed: IsPortUsed;
};

export type IsPortUsed = (
    port: number,
    host: string,
    dependencies?: Partial<IsPortUsedDependencies>
) => Promise<boolean>;

export type IsPortUsedDependencies = {
    createServer: typeof net.createServer;
};
