import { ServerContext } from "../types/context/integration/server.type.js";
import { EventBus } from "../util/event-bus.js";
import { ConfigManager } from "../service/config-manager.js";
import { ApiRegistry } from "../util/api-registry.js";
import { ServerLogger } from "../service/server-logger.js";
import { SystemMetaManager } from "../service/system-meta/system-meta-manager.js";
import { RegisterManager } from "../service/register-manager.js";
import { WebSocketRouter } from "../service/web-socket-router.js";
import { HttpMetaManager } from "../service/http-meta/http-meta-manager.js";
import express from "express";
import type { OutEventBusMap, InnerEventBusMap } from "../types/server-event.type.js";
import type { RequestEventMap } from "../types/server.type.js";

export function createServerContext<
    RequestNameList extends string = string,
    WebSocketNameList extends string = string,
>(stop: () => Promise<void>): ServerContext {
    const outEventBus = new EventBus<OutEventBusMap>();
    const innerEventBus = new EventBus<InnerEventBusMap>();

    return {
        serverConfig: new ConfigManager(),
        serverRegister: new RegisterManager(),
        serverLogger: new ServerLogger(innerEventBus, outEventBus),
        systemMetaManager: new SystemMetaManager(),
        httpMetaManager: new HttpMetaManager(),
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
