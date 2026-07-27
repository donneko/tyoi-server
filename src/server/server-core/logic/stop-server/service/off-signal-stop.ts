import type { OffSignalStopDependencies } from "../../../types/dependencies/stop-server/stop-server.type.js";
import type { OffSignalStopContext } from "../../../types/context/stop-server/stop-server.type.js";
import { defaultOffSignalStopDependencies } from "../dependencies/server-stop.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function offSignalStop(
    context: OffSignalStopContext,
    dependencies: Partial<OffSignalStopDependencies> = {}
) {
    const deps = createDependencies<OffSignalStopDependencies>(
        defaultOffSignalStopDependencies,
        dependencies
    );

    deps.processOff("SIGINT", context.expressServer);
    deps.processOff("SIGTERM", context.expressServer);
}
