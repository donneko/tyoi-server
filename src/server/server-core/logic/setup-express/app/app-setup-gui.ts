import express from "express";
import { fileURLToPath } from "node:url";
import { WebSocket } from "ws";
import type { SetupGuiContext } from "../../../types/context/setup-express/stop-express.type.js";
import { isGuiRequestAllowed } from "../../../gui/access.js";
import { createGuiSummary, createGuiStatus } from "../../../gui/gui-data.js";
import { createGuiLogStore } from "../../../gui/log-store.js";
import type { GuiWebSocketMessage } from "../../../gui/gui.type.js";

export const GUI_ROOT_PATH = "/__tyoi";
export const GUI_WEBSOCKET_PATH = "/__tyoi/ws";

function resolveGuiOptions(value: boolean | { allowLan?: boolean | undefined }) {
    return {
        enabled: value !== false,
        allowLan: typeof value === "object" && value.allowLan === true,
    };
}

export function setupGui(
    context: SetupGuiContext,
    assetsPath = fileURLToPath(new URL("../../../../../../dist/gui", import.meta.url))
): void {
    const options = resolveGuiOptions(context.serverConfig.getConfig("gui"));
    if (!options.enabled) return;

    const logs = createGuiLogStore(30);
    const clients = new Set<WebSocket>();
    const send = (client: WebSocket, message: GuiWebSocketMessage) => {
        if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(message));
    };

    context.outEventBus.on("server/log:*", (data) => {
        const log = logs.add(data);
        if (!log) return;
        for (const client of clients) send(client, { type: "log", log });
    });

    const router = express.Router();
    router.use((request, response, next) => {
        if (isGuiRequestAllowed(options.allowLan, request.socket.remoteAddress)) {
            next();
            return;
        }
        response.status(403).json({ error: "tyoi-server GUI is restricted to local access" });
    });
    router.get("/api/summary", (_request, response) => response.json(createGuiSummary(context)));
    router.get("/api/status", (_request, response) => response.json(createGuiStatus(context)));
    router.get("/api/log", (_request, response) => response.json({ logs: logs.list() }));
    router.use(express.static(assetsPath, { index: "index.html" }));
    context.expressServer.use(GUI_ROOT_PATH, router);

    context.webSocketRouter.onInternal(GUI_WEBSOCKET_PATH, ({ ws, req }) => {
        if (!isGuiRequestAllowed(options.allowLan, req.socket.remoteAddress)) {
            ws.close(1008, "tyoi-server GUI is restricted to local access");
            return;
        }

        clients.add(ws);
        send(ws, {
            type: "snapshot",
            summary: createGuiSummary(context),
            status: createGuiStatus(context),
            logs: logs.list(),
        });
        const disconnect = () => clients.delete(ws);
        ws.once("close", disconnect);
        ws.once("error", disconnect);
    });
}
