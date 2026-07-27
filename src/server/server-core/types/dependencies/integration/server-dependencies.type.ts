import type {
    ServerContext,
    ServerStopContext,
} from "../../context/integration/server-context.type.js";

export type ServerDependencies<
    WebSocketNameList extends string = string,
    RequestNameList extends string = string,
> = {
    stop: (dependencies: ServerStopServerDependencies) => Promise<void>;
};
