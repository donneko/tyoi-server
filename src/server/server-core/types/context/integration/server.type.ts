import type { OutEventBusMap, InnerEventBusMap } from "../../server-event.type.js";
import type { EventBus } from "../../../util/event-bus.js";
import type { ConfigManager } from "../../../service/config-manager.js";
import type { HandlerRegistry } from "../../../util/api-registry.js";
import type { ServerLogger } from "../../../service/server-logger.js";
import type { RegisterManager } from "../../../service/register-manager.js";
import type { WebSocketRouter } from "../../../service/web-socket-router.js";
import type { RequestEventMap } from "../../server.type.js";
import type { MessageManager } from "../../../../../messages/app/message-manager.js";
import type express from "express";

export type ServerContext<
    WebSocketNameList extends string = string,
    RequestNameList extends string = string,
> = {
    innerEventBus: EventBus<InnerEventBusMap>;
    outEventBus: EventBus<OutEventBusMap>;
    serverLogger: ServerLogger;
    serverConfig: ConfigManager;
    serverRegister: RegisterManager;
    messageManager: MessageManager;
    webSocketRouter: WebSocketRouter<WebSocketNameList>;
    expressServer: express.Express;
    apiRegistry: HandlerRegistry<RequestEventMap<RequestNameList>>;
    stopHandler: () => Promise<void> | void;
};
