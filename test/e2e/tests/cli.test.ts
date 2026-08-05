import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { runCommand } from "../helper/command-run-tmp-dir.js";
import { createPackToTmpDir } from "../helper/create-pack-to-tmp-dir.js";
import { createTmpDir } from "../helper/create-tmp-dir.js";
import { installPackage } from "../helper/install-package.js";
import { removeTmpDir } from "../helper/remove-tmp-dir.js";
import { copyTmpDir } from "../helper/copy-tmp-dir.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";
import { getNpmCommand } from "../helper/get-npm-command.js";

describe("cli e2e", () => {
    let tmpDir = "";
    const npmCmd = getNpmCommand();

    beforeEach(async () => {
        tmpDir = await createTmpDir("tyoi-e2e-cli");
        const packDir = createPackToTmpDir(tmpDir);
        const packageUrl = new URL("../template/package.json", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);
        await installPackage(tmpDir, packDir);
    }, 15_000);
    afterEach(async () => {
        await removeTmpDir(tmpDir);
    });
    it("tyoi 実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("tyoi --version が実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "--version"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("tyoi -v が実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "-v"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("tyoi --help が実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "--help"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("tyoi -h が実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "-h"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("help 実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "help"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("info 実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "tyoi", "info"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("setting で言語を変更できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "tyoi",
            "setting",
            "language",
            "en-US",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("setting で言語を変更して戻せる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "tyoi",
            "language",
            "ja-JP",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("init で basic-ts テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "init",
            "my-app",
            "--template",
            "basic-ts",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("init で basic-js テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "init",
            "my-app",
            "--template",
            "basic-js",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("create で basic-ts テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "create",
            "my-app",
            "--template",
            "basic-ts",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("create で basic-js テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "create",
            "my-app",
            "--template",
            "basic-js",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("create で static-ts テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "create",
            "my-app",
            "--template",
            "static-ts",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("create で api-ts テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "create",
            "my-app",
            "--template",
            "api-ts",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("create で realtime-ts テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "create",
            "my-app",
            "--template",
            "realtime-ts",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("config で basic テンプレートを実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, [
            "exec",
            "--",
            "config",
            "my-app",
            "--template",
            "basic",
        ]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("run を実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "run"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("run --port オプションつきで実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "run"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("run -p オプションつきで実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "run", "-p", "0"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("run --port オプションつきで実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "run", "-port", "0"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("dev を実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "dev"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("dev --port オプションつきで実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "dev", "-p", "0"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("dev -p オプションつきで実行できる", async () => {
        const result = await runCommand(tmpDir, npmCmd, ["exec", "--", "dev", "-port", "0"]);
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
