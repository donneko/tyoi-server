import type { ServerCreateNetworkDataDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import { defaultServerCreateNetworkDataDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type { ServerCreateNetworkReturn } from "../../../types/server.type.js";

export function createNetworkData(
    port: number,
    host: string,
    dependencies: Partial<ServerCreateNetworkDataDependencies> = {}
): ServerCreateNetworkReturn {
    const deps = createDependencies<ServerCreateNetworkDataDependencies>(
        defaultServerCreateNetworkDataDependencies,
        dependencies
    );

    // LAN設定
    const isLAN = host === "0.0.0.0";
    const ip = deps.getLanIp();
    const networkUrl = `http://${ip}:${port}`;

    return { networkUrl, isLAN };
}
