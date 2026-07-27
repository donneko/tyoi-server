import type { SetupApiProcessContext } from "../../../types/context/setup-express/stop-express.type.js";
import type { SetupApiProcessDependencies } from "../../../types/dependencies/setup-express/setup-express.type.js";
import { defaultSetupApiProcessDependencies } from "../dependencies/setup-express.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function setupApiProcess(
    apiPrefix: string,
    context: SetupApiProcessContext,
    dependencies: Partial<SetupApiProcessDependencies> = {}
) {
    const deps = createDependencies<SetupApiProcessDependencies>(
        defaultSetupApiProcessDependencies,
        dependencies
    );

    context.expressServer.use(apiPrefix, (rep, res) => {
        deps.apiProcess(rep, res, context);
    });
}
