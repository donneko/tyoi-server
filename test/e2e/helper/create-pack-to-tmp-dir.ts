import { spawnSync } from "node:child_process";
import path from "node:path";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";
import { getNpmCommand } from "../helper/get-npm-command.js";

type PackResult = {
    filename: string;
};

export function createPackToTmpDir(tmpDir: string): string {
    const result = spawnSync(getNpmCommand(), ["pack", "--json", "--pack-destination", tmpDir], {
        cwd: process.cwd(),
        encoding: "utf8",
        shell: process.platform === "win32",
    });

    if (result.status !== 0) {
        throw new Error(
            `npm pack failed\n\n${process.cwd()}\n\n${formatTestProcessResult({
                status: result.status,
                signal: result.signal,
                stdout: result.stdout,
                stderr: result.stderr,
                error: result.error,
            })}`
        );
    }

    const output = JSON.parse(result.stdout) as PackResult[];

    const filename = output[0]?.filename;

    if (!filename) {
        throw new Error("npm packの出力ファイル名を取得できませんでした");
    }

    const tarballPath = path.join(tmpDir, filename);

    return tarballPath;
}
