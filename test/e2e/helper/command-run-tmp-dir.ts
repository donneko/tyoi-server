import { spawn } from "node:child_process";

export interface TestProcessReturn {
    status: number | null;
    signal: NodeJS.Signals | null;
    stdout: string;
    stderr: string;
    error: Error | undefined;
}
export interface TestProcessConfig {
    timeout: number;
}

const defaultTestProcessConfig: TestProcessConfig = {
    timeout: 4_500,
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
        const child = spawn(command, args, {
            cwd,
            stdio: ["pipe", "pipe", "pipe"],
            timeout: useConfig.timeout,
            shell: process.platform === "win32",
        });

        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");

        child.stdout.on("data", (data: string) => {
            result.stdout += data;
        });

        child.stderr.on("data", (data: string) => {
            result.stderr += data;
        });

        child.on("error", (error) => {
            result.error = error;
            resolve(result);
        });

        child.on("exit", (code, signal) => {
            result.status = code;
            result.signal = signal;
            resolve(result);
        });
    });
}
