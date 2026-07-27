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

export function defaultSetupExpressDependencies(): SetupExpressDependencies {
    return {
        createExpressConfig: createExpressConfig,
        setupMiddleware: setupMiddleware,
        setupDefaultMiddleware: setupDefaultMiddleware,
        setupApiProcess: setupApiProcess,
        setupStaticFile: setupStaticFile,
    };
}
export function defaultSetupApiProcessDependencies(): SetupApiProcessDependencies {
    return {
        apiProcess: apiProcess,
    };
}
