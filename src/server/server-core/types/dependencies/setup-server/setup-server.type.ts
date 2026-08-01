import type { ServerCreateServerConfigReturn } from "../../../types/server.type.js";
import type {
    CreateServerConfigContext,
    SetupPublicPathContext,
    SetupLanguagesContext,
} from "../../context/setup-server/setup-server.type.js";

export type SetupServerDependencies = {
    createServerConfig: CreateServerConfig;
    setupPublicPath: SetupPublicPath;
    setupLanguages: SetupLanguages;
};

export type CreateServerConfig = (
    context: CreateServerConfigContext
) => ServerCreateServerConfigReturn;

export type SetupPublicPath = (
    baseDirname: string,
    publicDirname: string,
    context: SetupPublicPathContext,
    dependencies?: Partial<SetupPublicPathDependencies>
) => void;

export type SetupPublicPathDependencies = {
    pathNormalization: PathNormalization;
};

export type PathNormalization = (baseDirname: string, publicDirname: string) => string;

export type SetupLanguages = (context: SetupLanguagesContext) => void;
