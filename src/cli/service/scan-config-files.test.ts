import { afterEach, describe, expect, it, vi } from "vitest";
import fs from "fs/promises";

const readDirectory = vi.hoisted(() => vi.fn());

vi.mock("./read-directory.js", () => ({ readDirectory }));

import { scanConfigFiles } from "./scan-config-files.js";

describe("scanConfigFiles", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        readDirectory.mockReset();
    });

    it("通常ファイルの config を設定ディレクトリとして扱わない", async () => {
        readDirectory.mockResolvedValueOnce(["config", "tyoi.config.js"]);
        vi.spyOn(fs, "stat").mockResolvedValue({
            isDirectory: () => false,
        } as never);

        await expect(scanConfigFiles(".")).resolves.toEqual(["tyoi.config.js"]);
        expect(readDirectory).toHaveBeenCalledOnce();
    });
});
