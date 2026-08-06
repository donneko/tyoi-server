import { rm } from "node:fs/promises";

export async function removeTmpDir(tmpdir: string) {
    for (let attempt = 0; attempt < 20; attempt++) {
        try {
            await rm(tmpdir, {
                recursive: true,
                force: true,
            });
            return;
        } catch (error) {
            if (
                !(error instanceof Error) ||
                !["EBUSY", "EPERM", "ENOTEMPTY"].includes(
                    (error as NodeJS.ErrnoException).code ?? ""
                ) ||
                attempt === 19
            ) {
                throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }
}
