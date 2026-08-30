import type { ChildProcess } from "node:child_process";
import type { MainMessage } from "../types/process.type.js";
import { processSend } from "../process-send.js";

export type MainProcessController = {
    cleanup: () => void;
    isShuttingDown: () => boolean;
    shutdown: (force?: boolean) => void;
};

export function mainProcessSetup(child: ChildProcess): MainProcessController {
    let isShuttingDown = false;

    const forceKill = () => {
        try {
            child.kill("SIGKILL");
        } catch {
            // The child may already have exited while shutting down.
        }
    };

    const shutdown = (force: boolean = false) => {
        if (force) {
            forceKill();
            return;
        }
        if (isShuttingDown) return;
        isShuttingDown = true;
        try {
            processSend<MainMessage>(child, { type: "shutdown" });
        } catch {
            forceKill();
        }
    };

    const signalShutdown = () => shutdown(isShuttingDown);

    process.on("SIGINT", signalShutdown);
    process.on("SIGTERM", signalShutdown);

    const cleanup = () => {
        process.off("SIGINT", signalShutdown);
        process.off("SIGTERM", signalShutdown);
    };

    return {
        cleanup,
        isShuttingDown: () => isShuttingDown,
        shutdown,
    };
}
