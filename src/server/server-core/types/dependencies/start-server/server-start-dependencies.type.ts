import type { ServerCreateHttpServer } from "./create-http-server.type.js";
import type { CreateServerConfig } from "./create-server-config.type.js";
import type { ServerPostStartup } from "./server-post-startup.type.js";
import type { ServerStartCatchError } from "./server-start-catch-error.type.js";
import type { ServerUpdatePort } from "./server-update-port.type.js";
import type { SetupSignalStop } from "./setup-signal-stop.type.js";

export type ServerStartDependencies = {
    createServerConfig: CreateServerConfig;
    createHttpServer: ServerCreateHttpServer;
    setupSignalStop: SetupSignalStop;
    updatePort: ServerUpdatePort;
    serverPostStartup: ServerPostStartup;
    startCatchError: ServerStartCatchError;
};
