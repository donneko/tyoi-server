import type { ServerPostStartupDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import type { ServerSummaryContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultServerPostStartupDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import { CustomError } from "../../../error/custom-error.js";

export async function serverPostStartup(
    config: ServerStartUseConfig,
    context: ServerSummaryContext,
    dependencies: Partial<ServerPostStartupDependencies> = {}
) {
    const deps = createDependencies<ServerPostStartupDependencies>(
        defaultServerPostStartupDependencies,
        dependencies
    );

    try {
        // スタートログ
        deps.serverSummary(config, context);
    } catch (cause) {
        throw new CustomError("サーバーサマリー生成ができませんでした", {
            cause,
            errorName: "SUMMARY_ERROR",
        });
    }

    try {
        // ブラウザオープン
        await deps.serverOpenBrowser({ ...config, target: config.openBrowser }, context);
    } catch (cause) {
        throw new CustomError("ブラウザを開けませんでした", {
            cause,
            errorName: "BROWSER_OPEN_ERROR",
        });
    }
}
