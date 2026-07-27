import type { ServerStartUseConfig } from "../../../types/server.type.js";
import type {
    ServerSummaryContext,
    ServerOpenBrowserContext,
} from "../../context/start-server/start-server.type.js";
import type { ServerCreateNetworkReturn } from "../../../types/server.type.js";
import type { ServerOpenBrowserArgs } from "../../../types/server.type.js";

import type open from "open";
import type os from "node:os";
import type qrcode from "qrcode-terminal";

export type ServerPostStartup = (
    config: ServerStartUseConfig,
    context: ServerSummaryContext,
    dependencies: ServerPostStartupDependencies
) => Promise<void>;

export type ServerPostStartupDependencies = {
    serverSummary: ServerSummary;
    serverOpenBrowser: ServerOpenBrowser;
};

export type ServerOpenBrowser = (
    openBrowserData: ServerOpenBrowserArgs,
    context: ServerOpenBrowserContext,
    dependencies: ServerOpenBrowserDependencies
) => Promise<void>;

export type ServerOpenBrowserDependencies = {
    createNetworkData: ServerCreateNetworkData;
    open: typeof open;
};

export type ServerSummary = (
    config: ServerStartUseConfig,
    context: ServerSummaryContext,
    dependencies: ServerSummaryDependencies
) => void;

export type ServerSummaryDependencies = {
    createNetworkData: ServerCreateNetworkData;
    qrcodeGenerate: typeof qrcode.generate;
};
export type ServerCreateNetworkData = (
    port: number,
    host: string,
    dependencies: ServerCreateNetworkDataDependencies
) => ServerCreateNetworkReturn;

export type ServerCreateNetworkDataDependencies = {
    getLanIp: ServerGetLanIp;
};

export type ServerGetLanIp = (dependencies: ServerGetLanIpDependencies) => string;

export type ServerGetLanIpDependencies = {
    networkInterfaces: typeof os.networkInterfaces;
};
