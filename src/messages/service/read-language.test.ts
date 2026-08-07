import fs from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { parseDictionary } from "./read-language.js";

describe("parseDictionary", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("配列を言語辞書として受け入れない", () => {
        vi.spyOn(fs, "readFileSync").mockReturnValue('["message"]' as never);

        expect(() => parseDictionary("invalid.json")).toThrow(
            "Invalid language dictionary: invalid.json"
        );
    });
});
