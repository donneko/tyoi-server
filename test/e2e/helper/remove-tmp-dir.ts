import { rm } from "node:fs/promises";

export async function removeTmpDir(tmpdir: string) {
    await rm(tmpdir, {
        recursive: true,
        force: true,
    });
}
