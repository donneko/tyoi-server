import type { BrowserTarget } from "./public/config.type.js";
import type express from "express";

export type {
    ServerConfig,
    ServerOptions,
    StartOptions,
    BrowserTarget,
} from "./public/config.type.js";
export type { RequestData, RequestEventMap } from "./public/api.type.js";
export type { WsHandler } from "./public/websocket.type.js";

export type ServerRegister = {
    publicDirectoryPath?: string;
};

export type ServerStartUseConfig = {
    port: number;
    lan: boolean;
    qr: boolean;
    publicPath: string;
    publicFullPath: string;
    browser: BrowserTarget;
    api: string;
    host: "0.0.0.0" | "127.0.0.1";
    signalClose: boolean;
};

export type ServerStartFindPortArgs = {
    startPort: number;
    host: string;
    isAutoPort: boolean;
};

export type ServerStartSummaryArgs = {
    host: string;
    port: number;
    publicPath: string;
    publicFullPath: string;
    api: string;
    qr: boolean;
};

export type ServerCreateNetworkReturn = { networkUrl: string; isLAN: boolean };

export type ServerOpenBrowserArgs = {
    host: string;
    port: number;
    target: BrowserTarget;
};

export type ServerCreateExpressConfigReturn = {
    middlewares: express.RequestHandler[];
    api: string;
    publicDirectoryPath: string;
};

export type ServerCreateServerConfigReturn = {
    root: string;
    public: string;
    signalClose: boolean;
};
