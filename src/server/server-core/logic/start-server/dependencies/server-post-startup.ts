import type {
    ServerPostStartupDependencies,
    ServerOpenBrowserDependencies,
    ServerSummaryDependencies,
    ServerCreateNetworkDataDependencies,
    ServerGetLanIpDependencies,
} from "../../../types/dependencies/start-server/server-post-startup.type.js";
import { openBrowser } from "../service/open-browser.js";
import { serverSummary } from "../service/server-summary.js";
import { createNetworkData } from "../service/create-network-data.js";
import { getLanIp } from "../util/get-lan-ip.js";
import qrcode from "qrcode-terminal";
import os from "node:os";
import open from "open";

export function defaultServerPostStartupDependencies(): ServerPostStartupDependencies {
    return {
        serverSummary: serverSummary,
        serverOpenBrowser: openBrowser,
    };
}
export function defaultServerOpenBrowserDependencies(): ServerOpenBrowserDependencies {
    return {
        createNetworkData: createNetworkData,
        open: open,
    };
}
export function defaultServerSummaryDependencies(): ServerSummaryDependencies {
    return {
        createNetworkData: createNetworkData,
        qrcodeGenerate: qrcode.generate.bind(qrcode),
    };
}

export function defaultServerCreateNetworkDataDependencies(): ServerCreateNetworkDataDependencies {
    return {
        getLanIp: getLanIp,
    };
}

export function defaultServerGetLanIpDependencies(): ServerGetLanIpDependencies {
    return {
        networkInterfaces: os.networkInterfaces,
    };
}
