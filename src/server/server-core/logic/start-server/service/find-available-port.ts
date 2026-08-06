import type { FindAvailablePortDependencies } from "../../../types/dependencies/start-server/create-server-config.type.js";
import type { FindAvailablePortContext } from "../../../types/context/start-server/start-server.type.js";
import type { ServerStartFindPortArgs } from "../../../types/server.type.js";
import { defaultFindAvailablePortDependencies } from "../dependencies/create-server-config.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import { CustomError } from "../../../error/custom-error.js";

export async function findAvailablePort(
    findPortArgs: ServerStartFindPortArgs,
    context: FindAvailablePortContext,
    dependencies: Partial<FindAvailablePortDependencies> = {}
) {
    const deps = createDependencies<FindAvailablePortDependencies>(
        defaultFindAvailablePortDependencies,
        dependencies
    );

    const { startPort, host, isAutoPort } = findPortArgs;

    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;
    let port = startPort;
    const MAX_PORT = 65535;

    // ポートが使用されていたら、別のポートへ
    while (await deps.isPortUsed(port, host)) {
        if (port >= MAX_PORT) {
            throw new CustomError(messageManager.message("server.port.rejected", { port }), {
                errorName: "PORT_NOT_PERMISSION",
            });
        }

        if (isAutoPort) {
            port++;
            continue;
        }

        serverLogger.logger("bar");
        serverLogger.logger("warn", messageManager.message("server.port.unavailable", { port }));

        const pass = await deps.askPermission(
            serverLogger.logger(
                "createSystem",
                messageManager.message("server.port.useAlternativePrompt", { port: port + 1 })
            ).createMessage
        );

        if (!pass) {
            //許可されなかったら、例外
            throw new CustomError(messageManager.message("server.port.rejected", { port }), {
                errorName: "PORT_NOT_PERMISSION",
            });
        }

        port++;
        serverLogger.logger("info", messageManager.message("server.port.selected", { port }));
    }

    return port;
}
