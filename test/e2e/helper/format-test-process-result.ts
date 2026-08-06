import type { TestProcessReturn } from "./command-run-tmp-dir.js";

export function formatTestProcessResult(result: TestProcessReturn): string {
    return [
        `status: ${result.status}`,
        `signal: ${result.signal ?? "none"}`,
        `error: ${result.error?.message ?? "none"}`,
        `stdout:\n${result.stdout}`,
        `stderr:\n${result.stderr}`,
    ].join("\n\n");
}
