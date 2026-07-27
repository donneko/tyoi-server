import type { ServerCreateServerConfigReturn } from "../../../types/server.type.js";
import type {
    CreateServerConfigContext,
    SetupPublicPathContext,
} from "../../context/setup-server/setup-server.type.js";

export type SetupServerDependencies = {
    createServerConfig: CreateServerConfig;
    setupPublicPath: SetupPublicPath;
};

export type CreateServerConfig = (
    context: CreateServerConfigContext
) => ServerCreateServerConfigReturn;

export type SetupPublicPath = (
    baseDirname: string,
    publicDirname: string,
    context: SetupPublicPathContext,
    dependencies: SetupPublicPathDependencies
) => void;

export type SetupPublicPathDependencies = {
    pathNormalization: PathNormalization;
};

export type PathNormalization = (baseDirname: string, publicDirname: string) => string;
