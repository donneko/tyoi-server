import type { ServerOpenBrowserDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import type { ServerSummaryContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultServerOpenBrowserDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type { ServerOpenBrowserArgs } from "../../../types/server.type.js";

export async function openBrowser(
    openBrowserData: ServerOpenBrowserArgs,
    context: ServerSummaryContext,
    dependencies: Partial<ServerOpenBrowserDependencies> = {}
): Promise<void> {
    const deps = createDependencies<ServerOpenBrowserDependencies>(
        defaultServerOpenBrowserDependencies,
        dependencies
    );

    const { host, port, target } = openBrowserData;

    if (!target) return;

    const serverLogger = context.serverLogger;
    const systemMetaManager = context.systemMetaManager;

    const { isLAN, networkUrl } = deps.createNetworkData(port, host);

    if (!isLAN && target === "network")
        serverLogger.logger("warn", systemMetaManager.getMeta(112).message);

    const targetUrl = isLAN && target === "network" ? networkUrl : `http://localhost:${port}`;

    await deps.open(targetUrl);
}
