import type {
    CreateFinishContext,
    OffSignalStopContext,
} from "../../context/stop-server/stop-server.type.js";
import type http from "node:http";

export type ServerStopDependencies = {
    offSignalStop: OffSignalStop;
    createFinish: CreateFinish;
};

export type OffSignalStop = (
    context: OffSignalStopContext,
    dependencies: OffSignalStopDependencies
) => void;
export type OffSignalStopDependencies = {
    processOff: typeof process.off;
};

export type CreateFinish = (
    httpServer: http.Server,
    resolve: () => void,
    context: CreateFinishContext
) => { finish: () => void; settled: boolean };
