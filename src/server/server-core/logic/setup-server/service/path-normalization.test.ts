import path from "node:path";
import { describe, expect, it } from "vitest";
import { pathNormalization } from "./path-normalization.js";

describe("pathNormalization", () => {
    it("基準ディレクトリと公開ディレクトリを絶対パスに解決する", () => {
        expect(pathNormalization("/project", "public/assets")).toBe(
            path.resolve("/project", "public/assets")
        );
    });
});
