import type { SetupExpressDependencies } from "../../../types/dependencies/setup-express/setup-express.type.js";
import type { ServerExpressContext } from "../../../types/context/setup-express/stop-express.type.js";

import { defaultSetupExpressDependencies } from "../dependencies/setup-express.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export function setupExpress(
    context: ServerExpressContext,
    dependencies: Partial<SetupExpressDependencies> = {}
) {
    const deps = createDependencies<SetupExpressDependencies>(
        defaultSetupExpressDependencies,
        dependencies
    );

    const expressConfig = deps.createExpressConfig(context);

    // ミドルウェア
    deps.setupMiddleware(expressConfig.middlewares, context);

    // JSONを受け取れるようにする
    deps.setupDefaultMiddleware(context);

    // API
    deps.setupApiProcess(expressConfig.api, context);

    // 静的ファイル配信
    deps.setupStaticFile(expressConfig.publicDirectoryPath, context);
}
