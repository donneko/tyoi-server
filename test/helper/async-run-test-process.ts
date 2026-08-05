import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

export interface TestProcessReturn {
    status: number | null;
    signal: NodeJS.Signals | null;
    stdout: string;
    stderr: string;
    error: Error | undefined;
}
export interface TestProcessConfig {
    timeout: number;
    input: string | undefined;
}

const defaultTestProcessConfig: TestProcessConfig = {
    timeout: 5_000,
    input: undefined,
};

export async function runTestProcess(
    fileUrl: URL,
    config: Partial<TestProcessConfig> = {}
): Promise<TestProcessReturn> {
    const useConfig = {
        ...defaultTestProcessConfig,
        ...config,
    };

    const fixturePath = fileURLToPath(fileUrl.href);
    const result: TestProcessReturn = {
        status: null,
        signal: null,
        stdout: "",
        stderr: "",
        error: undefined,
    };

    return new Promise((resolve) => {
        const child = spawn(process.execPath, ["--import=tsx", fixturePath], {
            stdio: ["pipe", "pipe", "pipe"],
            timeout: useConfig.timeout,
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
