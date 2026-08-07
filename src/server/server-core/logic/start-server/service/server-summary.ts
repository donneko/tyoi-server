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

    const { host, port, publicPath, publicFullPath, api, qr } = args;
    const { networkUrl, isLAN } = deps.createNetworkData(port, host);

    const serverLogger = context.serverLogger;
    const messageManager = context.messageManager;

    // ステータス
    serverLogger.logger("window", messageManager.message("server.summary.title"), [
        serverLogger.logger("createSuccess", messageManager.message("server.summary.started")),
        serverLogger.logger("createInfo", messageManager.message("server.summary.port", { port })),
        serverLogger.logger("createInfo", messageManager.message("server.summary.local", { port })),
        ...(isLAN
            ? [
                  serverLogger.logger(
                      "createInfo",
                      messageManager.message("server.summary.network", { networkUrl })
                  ),
              ]
            : []),
        serverLogger.logger(
            "createInfo",
            messageManager.message("server.summary.publicFull", { publicFullPath })
        ),
        serverLogger.logger(
            "createInfo",
            messageManager.message("server.summary.public", { publicPath })
        ),
        serverLogger.logger("createInfo", messageManager.message("server.summary.api", { api })),
    ]);

    // QRcode生成
    if (qr && isLAN) {
        serverLogger.logger("window", messageManager.message("server.summary.qrCodeTitle"), [
            serverLogger.logger(
                "createInfo",
                messageManager.message("server.summary.networkQrCode")
            ),
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
