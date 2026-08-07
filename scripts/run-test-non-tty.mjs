import { spawnSync } from "node:child_process";
import process from "node:process";

export function getNpmCommand(platform = process.platform) {
    return platform === "win32" ? "npm.cmd" : "npm";
}

export function runTest() {
    const result = spawnSync(getNpmCommand(), ["run", "test"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: process.platform === "win32",
    });

    if (result.error) {
        throw result.error;
    }

    process.exitCode = result.status ?? 1;
}

if (process.argv[1] && process.argv[1].endsWith("run-test-non-tty.mjs")) {
    runTest();
}
