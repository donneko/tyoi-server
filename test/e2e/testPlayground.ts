import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { undoPlayground } from "./undoPlayground.js";
import { Logger } from "@donneko/tyoi-logger";

const PLAYGROUND_PASS = "../playground";

function getPlaygroundPath(): string {
    const dirname = import.meta.dirname;
    return path.join(dirname, PLAYGROUND_PASS);
}

async function waitForServer(port: number, timeoutMs: number): Promise<void> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
        try {
            const response = await fetch(`http://127.0.0.1:${port}`);
            if (response.ok) return;
        } catch {
            // 起動が完了するまで再試行する。
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    throw new Error(`Server did not respond on port ${port}`);
}

async function testCLI(playgroundPath: string): Promise<{ args: string[]; ok: boolean }[]> {
    const testResult: { args: string[]; ok: boolean }[] = [];
    const run = (args: string[]) => {
        console.log(`[テスト実行] : `, ...args);
        const result = spawnSync("npx", ["tyoi", ...args], {
            cwd: playgroundPath,
            stdio: "inherit",
        });

        testResult.push({
            args: ["npx", "tyoi", ...args],
            ok: result.status === 0 && result.error === undefined,
        });
    };
    const runServer = async (args: string[], port: number) => {
        console.log(`[サーバーテスト実行] : `, ...args);
        const child = spawn("npx", ["tyoi", ...args], {
            cwd: playgroundPath,
            stdio: "inherit",
        });
        let ok = false;

        try {
            await waitForServer(port, 10_000);
            ok = true;
        } catch (error) {
            console.error(error);
        } finally {
            child.kill("SIGTERM");
            await new Promise<void>((resolve) => {
                if (child.exitCode !== null) {
                    resolve();
                    return;
                }
                child.once("exit", () => resolve());
            });
        }

        testResult.push({
            args: ["npx", "tyoi", ...args],
            ok,
        });
    };
    const undo = () => {
        console.log("[戻しています]");
        undoPlayground(playgroundPath);
    };

    run(["help"]);
    run(["info"]);
    run(["init", "my-app", "--template", "basic-ts"]);
    undo();
    run(["init", "my-app", "--template", "basic-js"]);
    undo();
    run(["create", "my-app", "--template", "basic-ts"]);
    undo();
    run(["create", "my-app", "--template", "basic-js"]);
    undo();
    run(["create", "my-app", "--template", "static-ts"]);
    undo();
    run(["create", "my-app", "--template", "api-ts"]);
    undo();
    run(["create", "my-app", "--template", "realtime-ts"]);
    undo();
    run(["config", "my-app", "--template", "basic"]);
    await runServer(["run"], 3000);
    await runServer(["dev"], 3000);

    return testResult;
}

async function main() {
    const playgroundPath = getPlaygroundPath();

    const results = await testCLI(playgroundPath);

    const logger = new Logger();

    const summary = logger.createInfo(
        (() => {
            const ok = results.filter((r) => r.ok);
            const error = results.filter((r) => !r.ok);

            return `テスト回数 : ${results.length}\nOK : ${ok.length}\nERROR : ${error.length}`;
        })()
    );
    logger.window("CLIテスト結果の結果", [
        summary,
        logger.createBar(),
        ...results.map((r) =>
            r.ok ? logger.createSuccess(r.args.join(" ")) : logger.createError(r.args.join(" "))
        ),
    ]);

    if (results.some((result) => !result.ok)) {
        process.exitCode = 1;
    }
}

await main();
