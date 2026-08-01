import type { SetupServerDependencies } from "../../../types/dependencies/setup-server/setup-server.type.js";
import type { ServerSetupContext } from "../../../types/context/setup-server/setup-server.type.js";

import { defaultSetupServerDependencies } from "../dependencies/setup-server.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function setupServer(
    context: ServerSetupContext,
    dependencies: Partial<SetupServerDependencies> = {}
) {
    const deps = createDependencies<SetupServerDependencies>(
        defaultSetupServerDependencies,
        dependencies
    );

    const serverConfig = deps.createServerConfig(context);

    deps.setupLanguages(context);
    deps.setupPublicPath(serverConfig.baseDirname, serverConfig.publicDirname, context);
}
