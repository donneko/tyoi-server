import { runCommand } from "./command-run-tmp-dir.js";

export async function installPackage(tmpDir: string, tarballPath: string) {
    await runCommand(tmpDir, "npm", ["install", tarballPath]);
}
