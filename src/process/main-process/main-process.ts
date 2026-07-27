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

    deps.mainProcessSetup(child);

    return new Promise<void>((resolve, reject) => {
        let hasStarted = false;
        let hasStopped = false;

        child.once("error", reject);
        child.once("exit", (code, signal) => {
            if (hasStopped) return;

            const phase = hasStarted ? "after startup" : "before startup";
            reject(new Error(`Server process exited ${phase} (code=${code}, signal=${signal})`));
        });
        child.on("message", (message: unknown) => {
            if (!isProcessMessage<ServerMessage>(message, SERVER_MESSAGE_TYPES)) return;

            if (message.type === "ready") {
                hasStarted = true;
                return;
            }
            if (message.type === "error") {
                reject(new Error(message.message));
                child.disconnect();
                child.kill();
                return;
            }
            if (message.type === "stopped") {
                hasStopped = true;
                resolve();
            }
        });

        deps.processSend<MainMessage>(child, {
            type: "boot",
            data: { path, option },
        });
        deps.processSend<MainMessage>(child, {
            type: "start",
        });
    });
}
