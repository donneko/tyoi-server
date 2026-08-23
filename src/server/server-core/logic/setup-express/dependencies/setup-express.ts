import type {
    SetupExpressDependencies,
    SetupApiProcessDependencies,
} from "../../../types/dependencies/setup-express/setup-express.type.js";
import { createExpressConfig } from "../service/create-express-config.js";
import { setupMiddleware } from "../service/setup-middleware.js";
import { setupDefaultMiddleware } from "../service/setup-default-middleware.js";
import { setupApiProcess } from "../app/app-setup-api-process.js";
import { setupStaticFile } from "../app/app-setup-static.js";
import { apiProcess } from "../service/api-process.js";
import { setupGui } from "../app/app-setup-gui.js";

export function defaultSetupExpressDependencies(): SetupExpressDependencies {
    return {
        createExpressConfig: createExpressConfig,
        setupMiddleware: setupMiddleware,
        setupDefaultMiddleware: setupDefaultMiddleware,
        setupApiProcess: setupApiProcess,
        setupGui: setupGui,
        setupStaticFile: setupStaticFile,
    };
}
export function defaultSetupApiProcessDependencies(): SetupApiProcessDependencies {
    return {
        apiProcess: apiProcess,
    };
}
