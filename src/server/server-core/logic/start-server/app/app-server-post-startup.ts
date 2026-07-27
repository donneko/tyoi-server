import { openBrowser } from "../service/open-browser.js";
import { serverSummary } from "../service/server-summary.js";
import type { ServerPostStartupDependencies } from "../../../types/server-dependencies.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";
import { CustomError } from "../../../error/custom-error.js";

export async function serverPostStartup(
    config: ServerStartUseConfig,
    dependencies: ServerPostStartupDependencies
) {
    try {
        // スタートログ
        serverSummary(config, dependencies);
    } catch (cause) {
        throw new CustomError("サーバーサマリー生成ができませんでした", {
            cause,
            errorName: "SUMMARY_ERROR",
        });
    }

    try {
        // ブラウザオープン
        await openBrowser({ ...config, target: config.openBrowser }, dependencies);
    } catch (cause) {
        throw new CustomError("ブラウザを開けませんでした", {
            cause,
            errorName: "BROWSER_OPEN_ERROR",
        });
    }
}
