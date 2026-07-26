import { openBrowser } from "../service/open-browser.js";
import { serverSummary } from "../service/server-summary.js";
import type { ServerPostStartupDependencies } from "../../../types/server-dependencies.type.js";
import type { ServerStartUseConfig } from "../../../types/server.type.js";

export async function serverPostStartup(
    config: ServerStartUseConfig,
    dependencies: ServerPostStartupDependencies
) {
    // スタートログ
    serverSummary(config, dependencies);

    try {
        // ブラウザオープン
        await openBrowser({ ...config, target: config.openBrowser }, dependencies);
    } catch {
        dependencies.serverLogger.logger("warn", "ブラウザを開けませんでした");
    }
}
