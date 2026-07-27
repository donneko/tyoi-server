import type {
    CreateServerConfigDependencies,
    FindAvailablePortDependencies,
    IsPortUsedDependencies,
} from "../../../types/dependencies/start-server/create-server-config.type.js";
import { findAvailablePort } from "../service/find-available-port.js";
import { askPermission } from "../util/ask-permission.js";
import { isPortUsed } from "../util/is-port-used.js";
import net from "node:net";

export function defaultCreateServerConfigDependencies(): CreateServerConfigDependencies {
    return { findAvailablePort: findAvailablePort };
}
export function defaultFindAvailablePortDependencies(): FindAvailablePortDependencies {
    return {
        askPermission: askPermission,
        isPortUsed: isPortUsed,
    };
}

export function defaultIsPortUsedDependencies(): IsPortUsedDependencies {
    return { createServer: net.createServer };
}
