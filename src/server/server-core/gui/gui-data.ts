import type { SetupGuiContext } from "../types/context/setup-express/stop-express.type.js";
import type { GuiStatus, GuiSummary } from "./gui.type.js";

export function createGuiSummary(context: SetupGuiContext): GuiSummary {
    return {
        root: context.serverConfig.getConfig("root"),
        public: context.serverConfig.getConfig("public"),
        api: context.serverConfig.getConfig("api"),
        port: context.serverConfig.getConfig("port"),
        lan: context.serverConfig.getConfig("lan"),
        qr: context.serverConfig.getConfig("qr"),
        browser: context.serverConfig.getConfig("browser"),
        autoPort: context.serverConfig.getConfig("autoPort"),
        signalClose: context.serverConfig.getConfig("signalClose"),
        language: context.serverConfig.getConfig("language"),
        gui: context.serverConfig.getConfig("gui"),
    };
}

export function createGuiStatus(context: SetupGuiContext, now = Date.now()): GuiStatus {
    const startedAt = context.runtime.getStartedAt();
    return {
        state: context.runtime.isRunning() ? "running" : "stopped",
        port: context.serverConfig.getConfig("port"),
        uptimeSeconds:
            startedAt === undefined ? 0 : Math.max(0, Math.floor((now - startedAt) / 1000)),
        lastUpdated: new Date(now).toISOString(),
    };
}
