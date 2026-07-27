import type { ServerSummaryDependencies } from "../../../types/dependencies/start-server/server-post-startup.type.js";
import type { ServerSummaryContext } from "../../../types/context/start-server/start-server.type.js";
import { defaultServerSummaryDependencies } from "../dependencies/server-post-startup.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";
import type { ServerStartSummaryArgs } from "../../../types/server.type.js";

export function serverSummary(
    args: ServerStartSummaryArgs,
    context: ServerSummaryContext,
    dependencies: Partial<ServerSummaryDependencies> = {}
): void {
    const deps = createDependencies<ServerSummaryDependencies>(
        defaultServerSummaryDependencies,
        dependencies
    );

    const { host, port, publicPath, publicFullPath, apiPrefix, showQrCode } = args;
    const { networkUrl, isLAN } = deps.createNetworkData(port, host);

    const serverLogger = context.serverLogger;
    const systemMetaManager = context.systemMetaManager;
    const getMessage = (code: Parameters<typeof systemMetaManager.getMeta>[0]) =>
        systemMetaManager.getMeta(code).message;

    // ステータス
    serverLogger.logger("window", getMessage(121), [
        serverLogger.logger("createSuccess", getMessage(113)),
        serverLogger.logger("createInfo", `${getMessage(114)}${port}`),
        serverLogger.logger("createInfo", `${getMessage(115)}${port}`),
        ...(isLAN ? [serverLogger.logger("createInfo", `${getMessage(116)}${networkUrl}`)] : []),
        serverLogger.logger("createInfo", `${getMessage(117)}${publicFullPath}`),
        serverLogger.logger("createInfo", `${getMessage(118)}${publicPath}`),
        serverLogger.logger("createInfo", `${getMessage(119)}${apiPrefix}`),
    ]);

    // QRcode生成
    if (showQrCode && isLAN) {
        serverLogger.logger("window", getMessage(122), [
            serverLogger.logger("createInfo", systemMetaManager.getMeta(120).message),
            serverLogger.logger(
                "createInfo",
                (() => {
                    let qrString = "";
                    deps.qrcodeGenerate(networkUrl, { small: true }, (qr) => {
                        qrString = qr;
                    });
                    return qrString;
                })()
            ),
        ]);
    }
}
