import path from "node:path";
import { describe, expect, it } from "vitest";
import { createCommandArgs } from "./command-run-tmp-dir.js";
import { getNpmCommand } from "./get-npm-command.js";

describe("createCommandArgs", () => {
    it("places the npm cache option before npm exec arguments", () => {
        const cwd = path.join("tmp", "tyoi-e2e");
        const args = ["exec", "--", "tyoi", "--help"];

        expect(createCommandArgs(cwd, getNpmCommand(), args)).toEqual([
            "--cache",
            path.join(cwd, ".npm-cache"),
            ...args,
        ]);
    });

    it("does not alter non-npm command arguments", () => {
        const args = ["--help"];

        expect(createCommandArgs("tmp", "node", args)).toBe(args);
    });
});
