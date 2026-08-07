import type express from "express";

export type BrowserTarget = boolean | "local" | "lan";

export type ServerConfig = {
    root?: string;
    public?: string;
    api?: string;
    port?: number;
    middlewares?: express.RequestHandler[];
    lan?: boolean;
    qr?: boolean;
    browser?: BrowserTarget;
    autoPort?: boolean;
    signalClose?: boolean;
    language?: string;
};

export type ServerOptions = ServerConfig & {
    root: string;
};

export type StartOptions = Pick<ServerConfig, "port" | "lan" | "qr" | "browser" | "autoPort">;
