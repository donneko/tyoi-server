import type { ServerGetLanIpDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import { defaultServerGetLanIpDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function getLanIp(dependencies: Partial<ServerGetLanIpDependencies> = {}) {
    const deps = createDependencies<ServerGetLanIpDependencies>(
        defaultServerGetLanIpDependencies,
        dependencies
    );

    const nets = deps.networkInterfaces();

    for (const name in nets) {
        const netList = nets[name];

        if (!netList) continue;

        for (const net of netList) {
            if (net.family === "IPv4" && !net.internal) {
                return net.address;
            }
        }
    }

    return "localhost";
}
