import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export async function createTmpDir(name: string = "tyoi-e2e"): Promise<string> {
    return mkdtemp(path.join(tmpdir(), `${name}-`));
}
