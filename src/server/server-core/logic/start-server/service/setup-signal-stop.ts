import type { ServerSignalStopDependencies } from "../../../types/server-dependencies.type.js";

export function setupSignalStop(
    signalShutdownHandling: boolean,
    dependencies: ServerSignalStopDependencies
) {
    if (signalShutdownHandling) {
        process.on("SIGINT", dependencies.stop.bind(dependencies));
        process.on("SIGTERM", dependencies.stop.bind(dependencies));
    }
}
