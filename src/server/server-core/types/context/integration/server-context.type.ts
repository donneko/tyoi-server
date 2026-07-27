import type { OutEventBusMap, InnerEventBusMap } from "../../server-event.type.js";
import type { EventBus } from "../../../util/event-bus.js";
import type { ConfigManager } from "../../../service/config-manager.js";
import type { ApiRegistry } from "../../../util/api-registry.js";
import type { ServerLogger } from "../../../service/server-logger.js";
import type { SystemMetaManager } from "../../../service/system-meta/system-meta-manager.js";
import type { RegisterManager } from "../../../service/register-manager.js";
import type { WebSocketRouter } from "../../../service/web-socket-router.js";
import type { RequestEventMap } from "../../server.type.js";
import express from "express";
import type { HttpMetaManager } from "../../../service/http-meta/http-meta-manager.js";

export type ServerContext<
    WebSocketNameList extends string = string,
    RequestNameList extends string = string,
> = {
    innerEventBus: EventBus<InnerEventBusMap>;
    outEventBus: EventBus<OutEventBusMap>;
    serverLogger: ServerLogger;
    serverConfig: ConfigManager;
    serverRegister: RegisterManager;
    systemMetaManager: SystemMetaManager;
    webSocketRouter: WebSocketRouter<WebSocketNameList>;
    expressServer: express.Express;
    serverAPIs: ApiRegistry<RequestEventMap<RequestNameList>>;
    httpMetaManager: HttpMetaManager;
};

export type ServerStopContext<WebSocketNameList extends string = string> = Pick<
    ServerContext<WebSocketNameList>,
    "serverLogger" | "systemMetaManager" | "webSocketRouter"
>;

export type ServerCreateHttpServerContext<WebSocketNameList extends string = string> = Pick<
    ServerContext<WebSocketNameList>,
    "expressServer" | "webSocketRouter"
>;

export type ServerSummaryContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type ServerOpenBrowserContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

export type CreateServerConfigContext = Pick<ServerContext, "serverConfig" | "serverRegister">;

export type FindAvailablePortContext = Pick<ServerContext, "serverLogger" | "systemMetaManager">;

// TODO stopのハンドラーをどうやって渡すか考える
export type SetupSignalStopContext = Pick<ServerContext, "expressServer">;

export type UpdatePortContext = Pick<ServerContext, "serverConfig">;

export type ServerStartCatchErrorContext = Pick<
    ServerContext,
    "serverLogger" | "systemMetaManager" | "innerEventBus"
>;
