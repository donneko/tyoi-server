import type express from "express";

/** ブラウザーを開く対象です。 / Target used when opening a browser. */
export type BrowserTarget = boolean | "local" | "lan";

/** 利用者が指定できるサーバー設定です。 / Server configuration that users can provide. */
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

/** `Server` をコードから作成するための設定です。 / Options for creating a `Server` in code. */
export type ServerOptions = ServerConfig & {
    root: string;
};

/** `start()` 呼び出し時に上書きできる起動設定です。 / Startup options that can be overridden when calling `start()`. */
export type StartOptions = Pick<ServerConfig, "port" | "lan" | "qr" | "browser" | "autoPort">;
