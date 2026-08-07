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
    root: string,
    publicDirectory: string,
    context: SetupPublicPathContext,
    dependencies?: Partial<SetupPublicPathDependencies>
) => void;

export type SetupPublicPathDependencies = {
    pathNormalization: PathNormalization;
};

export type PathNormalization = (root: string, publicDirectory: string) => string;

export type SetupLanguages = (context: SetupLanguagesContext) => void;
