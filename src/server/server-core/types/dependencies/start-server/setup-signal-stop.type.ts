import type { SetupSignalStopContext } from "../../context/start-server/start-server.type.js";

export type SetupSignalStop = (
    signalShutdownHandling: boolean,
    context: SetupSignalStopContext,
    dependencies?: Partial<SetupSignalStopDependencies>
) => void;
export type SetupSignalStopDependencies = {
    processOn: typeof process.on;
};
