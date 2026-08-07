import type { SetupSignalStopDependencies } from "../../../types/dependencies/start-server/setup-signal-stop.type.js";
import type { SetupSignalStopContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultSetupSignalStopDependencies } from "../dependencies/setup-signal-stop.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function setupSignalStop(
    signalClose: boolean,
    context: SetupSignalStopContext,
    dependencies: Partial<SetupSignalStopDependencies> = {}
) {
    const deps = createDependencies<SetupSignalStopDependencies>(
        defaultSetupSignalStopDependencies,
        dependencies
    );

    if (signalClose) {
        deps.processOn("SIGINT", context.stopHandler);
        deps.processOn("SIGTERM", context.stopHandler);
    }
}
