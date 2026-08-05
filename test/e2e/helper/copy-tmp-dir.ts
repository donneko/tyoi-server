import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

export async function copyTmpDir(tmpDir: string, selectFile: URL) {
    const fixturePath = fileURLToPath(selectFile.href);

    await fs.copyFile(fixturePath, tmpDir);
}
