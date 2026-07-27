import type { ServerSignalStopDependencies } from "../../../types/server-dependencies.type.js";

export function offSignalStop(dependencies: ServerSignalStopDependencies) {
    process.off("SIGINT", dependencies.stop);
    process.off("SIGTERM", dependencies.stop);
}
