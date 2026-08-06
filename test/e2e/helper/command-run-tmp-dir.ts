import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

export interface TestProcessReturn {
    status: number | null;
    signal: NodeJS.Signals | null;
    stdout: string;
    stderr: string;
    error: Error | undefined;
}
export interface TestProcessConfig {
    timeout: number;
    waitForOutput?: RegExp;
    expectRunning?: boolean;
}

const defaultTestProcessConfig: TestProcessConfig = {
    timeout: 10_000,
};

export async function runCommand(
    cwd: string,
    command: string,
    args: string[] = [],
    config: Partial<TestProcessConfig> = {}
): Promise<TestProcessReturn> {
    const useConfig = {
        ...defaultTestProcessConfig,
        ...config,
    };

    const result: TestProcessReturn = {
        status: null,
        signal: null,
        stdout: "",
        stderr: "",
        error: undefined,
    };

    return new Promise((resolve) => {
        let resolved = false;
        let ready = false;
        let expectedTermination = false;

        const resolveOnce = () => {
            if (resolved) return;
            resolved = true;
            resolve(result);
        };

        const killProcessTree = (pid: number | undefined) => {
            if (!pid) return;

            if (process.platform === "win32") {
                spawnSync("taskkill", ["/pid", String(pid), "/t", "/f"], {
                    stdio: "ignore",
                });
                try {
                    process.kill(pid);
                } catch {
                    // The process tree may already have been terminated by taskkill.
                }
            } else {
                try {
                    process.kill(-pid, "SIGTERM");
                } catch {
                    // The process group may already have been terminated.
                }
            }
        };

        const child = spawn(command, args, {
            cwd,
            detached: process.platform !== "win32",
            stdio: ["pipe", "pipe", "pipe"],
            shell: process.platform === "win32",
            env: {
                ...process.env,
                npm_config_cache: path.join(cwd, ".npm-cache"),
            },
        });

        const timeoutId = setTimeout(() => {
            if (!ready) {
                result.error = new Error(
                    useConfig.expectRunning
                        ? "The process did not become ready before timeout"
                        : "The process did not exit before timeout"
                );
            }

            expectedTermination = true;
            killProcessTree(child.pid);
        }, useConfig.timeout);

        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");

        child.stdout.on("data", (data: string) => {
            result.stdout += data;

            if (useConfig.waitForOutput?.test(result.stdout) && !ready) {
                ready = true;
                result.status = 0;
                expectedTermination = true;
                killProcessTree(child.pid);
            }
        });

        child.stderr.on("data", (data: string) => {
            result.stderr += data;

            if (useConfig.waitForOutput?.test(result.stderr) && !ready) {
                ready = true;
                result.status = 0;
                expectedTermination = true;
                killProcessTree(child.pid);
            }
        });

        child.on("error", (error) => {
            clearTimeout(timeoutId);
            result.error = error;
            resolveOnce();
        });

        child.on("close", (code, signal) => {
            clearTimeout(timeoutId);
            if (!expectedTermination) {
                result.status = code;
                result.signal = signal;

                if ((useConfig.expectRunning || useConfig.waitForOutput) && !ready) {
                    result.error ??= new Error("The process exited before becoming ready");
                }
            }
            resolveOnce();
        });
    });
}
