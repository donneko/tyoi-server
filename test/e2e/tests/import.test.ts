import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runCommand } from "../helper/command-run-tmp-dir.js";
import { createPackToTmpDir } from "../helper/create-pack-to-tmp-dir.js";
import { createTmpDir } from "../helper/create-tmp-dir.js";
import { installPackage } from "../helper/install-package.js";
import { removeTmpDir } from "../helper/remove-tmp-dir.js";
import { copyTmpDir } from "../helper/copy-tmp-dir.js";
import { formatTestProcessResult } from "../helper/format-test-process-result.js";
import { getNodeCommand } from "../helper/get-node-command.js";
import fs from "node:fs/promises";
import path from "node:path";

vi.setConfig({ testTimeout: 20_000, hookTimeout: 30_000 });
// e2e test です。実行時間が長いため、一度のテストで同じジャンルをなるべく結果が変わらないようなものを実行します。
describe("import e2e", () => {
    let tmpDir = "";
    const nodeCommand = getNodeCommand();
    const serverCommandConfig = {
        timeout: 5_000,
        expectRunning: true,
    };

    beforeEach(async () => {
        tmpDir = await createTmpDir("tyoi-e2e-import");
        const packDir = createPackToTmpDir(tmpDir);
        const packageUrl = new URL("../template/package.json", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);
        await installPackage(tmpDir, packDir);
    }, 15_000);
    afterEach(async () => {
        await removeTmpDir(tmpDir);
    });

    it("lifecycle - 例外が発生しない・ポートにアクセスできる・Signalが回収されている", async () => {
        const packageUrl = new URL("../fixtures/import-lifecycle.js", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);

        const result = await runCommand(
            tmpDir,
            nodeCommand,
            ["./import-lifecycle.js"],
            serverCommandConfig
        );
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("static - 404を返せる・ページを配信できる", async () => {
        const packageUrl = new URL("../fixtures/import-static.js", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);

        // テストフォルダー作成・テストファイルをコピー
        const testDir = path.join(tmpDir, "./test-data");

        await fs.mkdir(testDir, { recursive: true });

        const testDataUrl = new URL("../fixtures/test-data/index.html", import.meta.url);
        await copyTmpDir(testDir, testDataUrl);

        const result = await runCommand(
            tmpDir,
            nodeCommand,
            ["./import-static.js"],
            serverCommandConfig
        );
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("api - GET・POSTができる・404を返せる・エラーを処理できる", async () => {
        const packageUrl = new URL("../fixtures/import-api.js", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);

        const result = await runCommand(
            tmpDir,
            nodeCommand,
            ["./import-api.js"],
            serverCommandConfig
        );
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
    it("websocket - サーバー・クライアントで接続ができる", async () => {
        const packageUrl = new URL("../fixtures/import-websocket.js", import.meta.url);
        await copyTmpDir(tmpDir, packageUrl);

        const result = await runCommand(
            tmpDir,
            nodeCommand,
            ["./import-websocket.js"],
            serverCommandConfig
        );
        const debag = formatTestProcessResult(result);

        expect(result.error, debag).toBeUndefined();
        expect(result.status, debag).toBe(0);
    });
});
