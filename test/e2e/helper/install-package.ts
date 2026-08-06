import { runCommand } from "./command-run-tmp-dir.js";
import { getNpmCommand } from "./get-npm-command.js";
import { formatTestProcessResult } from "./format-test-process-result.js";

export async function installPackage(tmpDir: string, tarballPath: string) {
    const npmCmd = getNpmCommand();
    const result = await runCommand(tmpDir, npmCmd, ["install", tarballPath], { timeout: 120_000 });

    if (result.error || result.status !== 0) {
        throw new Error(
            `npm install failed\n\n${formatTestProcessResult({
                status: result.status,
                signal: result.signal,
                stdout: result.stdout,
                stderr: result.stderr,
                error: result.error,
            })}`
        );
    }
}
