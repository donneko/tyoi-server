import type { ServerStartDependencies } from "../../../types/dependencies/start-server/server-start.type.js";
import { createHttpServer } from "../app/app-create-http-server.js";
import { updatePort } from "../service/update-port.js";
import { serverPostStartup } from "../app/app-server-post-startup.js";
import { startCatchError } from "../service/start-catch-error.js";
import { setupSignalStop } from "../service/setup-signal-stop.js";
import { createServerConfig } from "../service/create-server-config.js";

export function defaultServerStartDependencies(): ServerStartDependencies {
    return {
        createServerConfig: createServerConfig,
        createHttpServer: createHttpServer,
        setupSignalStop: setupSignalStop,
        updatePort: updatePort,
        serverPostStartup: serverPostStartup,
        startCatchError: startCatchError,
    };
}
