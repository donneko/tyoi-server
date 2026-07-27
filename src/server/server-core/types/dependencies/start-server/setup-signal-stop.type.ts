import type { SetupSignalStopContext } from "../../context/integration/server-context.type.js";

export type SetupSignalStop = (
    signalShutdownHandling: boolean,
    context: SetupSignalStopContext,
    dependencies: SetupSignalStopDependencies
) => void;
export type SetupSignalStopDependencies = {
    processOn: typeof process.on;
};
