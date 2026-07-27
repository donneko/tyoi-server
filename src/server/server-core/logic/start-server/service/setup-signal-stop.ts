import type { ServerSignalStopDependencies } from "../../../types/server-dependencies.type.js";

export function setupSignalStop(
    signalShutdownHandling: boolean,
    dependencies: ServerSignalStopDependencies
) {
    if (signalShutdownHandling) {
        process.on("SIGINT", dependencies.stop);
        process.on("SIGTERM", dependencies.stop);
    }
}
