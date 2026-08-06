import { fork } from "node:child_process";
import type { MainMessage } from "../types/process.type.js";
import type { ServerMessage } from "../types/process.type.js";
import { processSend } from "../process-send.js";
import { isProcessMessage } from "../is-process-message.js";
import { mainProcessSetup } from "./main-process-setup.js";

type ServerRuntimeDependencies = {
    fork: typeof fork;
    mainProcessSetup: typeof mainProcessSetup;
    processSend: typeof processSend;
};

export function serverRuntime(
    path: string,
    option: Record<string, unknown>,
    dependencies: Partial<ServerRuntimeDependencies> = {}
): Promise<void> {
    const deps: ServerRuntimeDependencies = {
        fork,
        mainProcessSetup,
        processSend,
        ...dependencies,
    };
    const SERVER_MESSAGE_TYPES = ["ready", "error", "stopped"];

    const child = deps.fork(new URL("../server-process/server-process.js", import.meta.url));

    const cleanupSignalHandlers = deps.mainProcessSetup(child);

    return new Promise<void>((resolve, reject) => {
        let settled = false;
        let hasStarted = false;
        let hasStopped = false;

        const settle = (callback: () => void) => {
            if (settled) return;
            settled = true;
            cleanupSignalHandlers?.();
            callback();
        };

        child.once("error", (error) => settle(() => reject(error)));
        child.once("exit", (code, signal) => {
            if (hasStopped) return;

            const phase = hasStarted ? "after startup" : "before startup";
            settle(() =>
                reject(new Error(`Server process exited ${phase} (code=${code}, signal=${signal})`))
            );
        });
        child.on("message", (message: unknown) => {
            if (!isProcessMessage<ServerMessage>(message, SERVER_MESSAGE_TYPES)) return;

            if (message.type === "ready") {
                hasStarted = true;
                return;
            }
            if (message.type === "error") {
                settle(() => reject(new Error(message.message)));
                child.disconnect();
                child.kill();
                return;
            }
            if (message.type === "stopped") {
                hasStopped = true;
                settle(resolve);
            }
        });

        try {
            deps.processSend<MainMessage>(child, {
                type: "boot",
                data: { path, option },
            });
            deps.processSend<MainMessage>(child, {
                type: "start",
            });
        } catch (error) {
            settle(() => reject(error));
        }
    });
}
