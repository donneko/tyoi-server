import type { ServerMessage } from "../types/process.type.js";
import { processSend } from "../process-send.js";

export function reportServerError(error: unknown, processSender: NodeJS.Process = process): void {
    const message = error instanceof Error ? error.message : String(error);

    try {
        processSend<ServerMessage>(processSender, { type: "error", message });
    } catch {
        // The IPC channel may already be disconnected while reporting the error.
    }

    try {
        processSender.disconnect?.();
    } catch {
        // The process may already be disconnected while cleaning up.
    }
}
