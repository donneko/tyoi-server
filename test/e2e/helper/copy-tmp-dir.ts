import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export async function copyTmpDir(tmpDir: string, selectFile: URL) {
    const fixturePath = fileURLToPath(selectFile.href);
    await fs.copyFile(fixturePath, path.join(tmpDir, path.basename(fixturePath)));
}
