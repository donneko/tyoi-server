import type { ServerMessage } from "../types/process.type.js";
import { processSend } from "../process-send.js";

type ServerProcessSetupDependencies = {
    processOn: typeof process.on;
    processOff: typeof process.off;
    processExit: typeof process.exit;
    processSend: typeof processSend;
};

export type ServerProcessController = {
    cleanup: () => void;
};

/**
 * 端末からのシグナルで子プロセスだけが先に終了することを防ぎます。
 * 停止処理は、同じシグナルを受けた親プロセスからの shutdown IPC に集約します。
 */
export function serverProcessSetup(
    dependencies: Partial<ServerProcessSetupDependencies> = {}
): ServerProcessController {
    const processOn = dependencies.processOn ?? process.on.bind(process);
    const processOff = dependencies.processOff ?? process.off.bind(process);
    const send = dependencies.processSend ?? processSend;
    const exit = dependencies.processExit ?? process.exit.bind(process);
    let shutdownRequested = false;

    const requestShutdown = () => {
        const force = shutdownRequested;
        shutdownRequested = true;

        try {
            send<ServerMessage>(process, { type: "shutdownRequest", force });
        } catch {
            exit(1);
        }
    };

    processOn("SIGINT", requestShutdown);
    processOn("SIGTERM", requestShutdown);

    return {
        cleanup: () => {
            processOff("SIGINT", requestShutdown);
            processOff("SIGTERM", requestShutdown);
        },
    };
}
