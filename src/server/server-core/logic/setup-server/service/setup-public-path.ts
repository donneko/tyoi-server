import type { SetupPublicPathContext } from "../../../types/context/setup-server/setup-server.type.js";
import type { SetupPublicPathDependencies } from "../../../types/dependencies/setup-server/setup-server.type.js";
import { defaultSetupPublicPathDependencies } from "../dependencies/setup-server.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function setupPublicPath(
    root: string,
    publicDirectory: string,
    context: SetupPublicPathContext,
    dependencies: Partial<SetupPublicPathDependencies> = {}
) {
    const deps = createDependencies<SetupPublicPathDependencies>(
        defaultSetupPublicPathDependencies,
        dependencies
    );

    const publicDirectoryPath = deps.pathNormalization(root, publicDirectory);
    context.serverRegister.updateConfig({ publicDirectoryPath });
}
