import { ServerContext } from "../types/context/integration/server.type.js";
import { EventBus } from "../util/event-bus.js";
import { ConfigManager } from "../service/config-manager.js";
import { ApiRegistry } from "../util/api-registry.js";
import { ServerLogger } from "../service/server-logger.js";
import { RegisterManager } from "../service/register-manager.js";
import { WebSocketRouter } from "../service/web-socket-router.js";
import { MessageManager } from "../../../messages/message-manager.js";
import express from "express";
import type { OutEventBusMap, InnerEventBusMap } from "../types/server-event.type.js";
import type { RequestEventMap } from "../types/server.type.js";
import { fileURLToPath } from "node:url";

export function createServerContext<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
>(stop: () => Promise<void>): ServerContext {
    const outEventBus = new EventBus<OutEventBusMap>();
    const innerEventBus = new EventBus<InnerEventBusMap>();
    const languagesPath = fileURLToPath(new URL("../../../../languages", import.meta.url));

    return {
        serverConfig: new ConfigManager(),
        serverRegister: new RegisterManager(),
        serverLogger: new ServerLogger(innerEventBus, outEventBus),
        messageManager: new MessageManager("ja-JP", languagesPath),
        webSocketRouter: new WebSocketRouter<WebSocketNameList>(),
        innerEventBus,
        outEventBus,
        expressServer: express(),
        serverAPIs: new ApiRegistry<RequestEventMap<RequestNameList>>(),
        stopHandler: async () => {
            await stop();
        },
    };
}
