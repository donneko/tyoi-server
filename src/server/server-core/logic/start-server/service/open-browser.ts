import type { ServerOpenBrowserDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import type { ServerSummaryContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultServerOpenBrowserDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type { ServerOpenBrowserArgs } from "../../../types/server.type.js";

export async function browser(
    browserData: ServerOpenBrowserArgs,
    context: ServerSummaryContext,
    dependencies: Partial<ServerOpenBrowserDependencies> = {}
): Promise<void> {
    const deps = createDependencies<ServerOpenBrowserDependencies>(
        defaultServerOpenBrowserDependencies,
        dependencies
    );

    const { host, port, target } = browserData;

    if (!target) return;

    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;

    const { isLAN, networkUrl } = deps.createNetworkData(port, host);

    if (!isLAN && target === "lan")
        serverLogger.logger("warn", messageManager.message("server.network.unavailable"));

    const targetUrl = isLAN && target === "lan" ? networkUrl : `http://localhost:${port}`;

    await deps.open(targetUrl);
}
