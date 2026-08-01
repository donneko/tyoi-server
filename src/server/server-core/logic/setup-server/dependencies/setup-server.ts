import type {
    SetupServerDependencies,
    SetupPublicPathDependencies,
} from "../../../types/dependencies/setup-server/setup-server.type.js";
import { setupPublicPath } from "../service/setup-public-path.js";
import { createServerConfig } from "../service/create-server-config.js";
import { pathNormalization } from "../service/path-normalization.js";
import { setupLanguages } from "../service/setup-languages.js";

export function defaultSetupServerDependencies(): SetupServerDependencies {
    return {
        createServerConfig: createServerConfig,
        setupPublicPath: setupPublicPath,
        setupLanguages: setupLanguages,
    };
}
export function defaultSetupPublicPathDependencies(): SetupPublicPathDependencies {
    return {
        pathNormalization: pathNormalization,
    };
}
