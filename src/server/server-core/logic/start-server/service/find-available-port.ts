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
    const systemMetaManager = context.systemMetaManager;
    const getMessage = (code: Parameters<typeof systemMetaManager.getMeta>[0], port: number) =>
        systemMetaManager.getMeta(code).message.replace("__PORT__", port.toString());
    let port = startPort;

    // ポートが使用されていたら、別のポートへ
    while (await deps.isPortUsed(port, host)) {
        if (isAutoPort) {
            port++;
            continue;
        }

        serverLogger.logger("bar");
        serverLogger.logger("warn", getMessage(108, port));

        const pass = await deps.askPermission(
            serverLogger.logger("createSystem", getMessage(109, port + 1)).createMessage
        );

        if (!pass) {
            //許可されなかったら、例外
            throw new CustomError(
                systemMetaManager.getMeta(110).message.replace("__PORT__", port.toString()),
                { errorName: "PORT_NOT_PERMISSION" }
            );
        }

        port++;
        serverLogger.logger("info", getMessage(111, port));
    }

    return port;
}
