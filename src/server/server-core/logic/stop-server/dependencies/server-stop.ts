import type {
    ServerStopDependencies,
    OffSignalStopDependencies,
} from "../../../types/dependencies/stop-server/stop-server.type.js";
import { createFinish } from "../service/create-finish.js";
import { offSignalStop } from "../service/off-signal-stop.js";

export function defaultServerStopDependencies(): ServerStopDependencies {
    return {
        offSignalStop: offSignalStop,
        createFinish: createFinish,
    };
}
export function defaultOffSignalStopDependencies(): OffSignalStopDependencies {
    return {
        processOff: process.off,
    };
}
