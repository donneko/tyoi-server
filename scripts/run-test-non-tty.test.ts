import { describe, expect, it } from "vitest";
import { getNpmCommand } from "./run-test-non-tty.mjs";

describe("run-test-non-tty", () => {
    it("uses the Windows npm command", () => {
        expect(getNpmCommand("win32")).toBe("npm.cmd");
    });

    it("uses the POSIX npm command", () => {
        expect(getNpmCommand("linux")).toBe("npm");
    });
});
