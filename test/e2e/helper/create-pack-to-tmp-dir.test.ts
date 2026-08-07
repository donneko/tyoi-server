import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { createPackToTmpDir } from "./create-pack-to-tmp-dir.js";

vi.mock("node:child_process", () => ({
    spawnSync: vi.fn(),
}));

describe("createPackToTmpDir", () => {
    it("passes the temporary cache directory directly to npm pack", () => {
        vi.mocked(spawnSync).mockReturnValue({
            status: 0,
            stdout: JSON.stringify([{ filename: "tyoi-server.tgz" }]),
            stderr: "",
            error: undefined,
            signal: null,
            pid: 1,
            output: [],
        });

        const tmpDir = path.join("tmp", "tyoi-e2e");
        const tarballPath = createPackToTmpDir(tmpDir);

        expect(tarballPath).toBe(path.join(tmpDir, "tyoi-server.tgz"));
        expect(spawnSync).toHaveBeenCalledWith(
            expect.any(String),
            [
                "pack",
                "--json",
                "--pack-destination",
                tmpDir,
                "--cache",
                path.join(tmpDir, ".npm-cache"),
            ],
            expect.objectContaining({
                env: expect.objectContaining({
                    npm_config_cache: path.join(tmpDir, ".npm-cache"),
                }),
            })
        );
    });
});
