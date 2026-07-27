import type { SetupSignalStopDependencies } from "../../../types/dependencies/start-server/setup-signal-stop.type.js";

export function defaultSetupSignalStopDependencies(): SetupSignalStopDependencies {
    return {
        processOn: process.on.bind(process),
    };
}
