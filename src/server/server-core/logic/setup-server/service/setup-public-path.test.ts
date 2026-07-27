import { describe, expect, it, vi } from "vitest";
import { setupPublicPath } from "./setup-public-path.js";

describe("setupPublicPath", () => {
    it("正規化した公開パスをレジスターへ保存する", () => {
        const updateConfig = vi.fn();
        const pathNormalization = vi.fn(() => "/project/public");

        setupPublicPath(
            "/project",
            "public",
            { serverRegister: { updateConfig } as never },
            { pathNormalization }
        );

        expect(pathNormalization).toHaveBeenCalledWith("/project", "public");
        expect(updateConfig).toHaveBeenCalledWith({
            publicDirectoryPath: "/project/public",
        });
    });
});
