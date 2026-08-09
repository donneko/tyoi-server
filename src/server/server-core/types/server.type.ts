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

/** 静的ファイル登録時の情報です。 / Static file registration data. */
export type ServerRegister = {
    publicDirectoryPath?: string;
};

/** 起動処理で使用する解決済み設定です。 / Resolved configuration used during startup. */
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

/** 使用可能なポートを探すための引数です。 / Arguments for finding an available port. */
export type ServerStartFindPortArgs = {
    startPort: number;
    host: string;
    isAutoPort: boolean;
};

/** 起動結果を表示するための情報です。 / Data used to display the startup summary. */
export type ServerStartSummaryArgs = {
    host: string;
    port: number;
    publicPath: string;
    publicFullPath: string;
    api: string;
    qr: boolean;
};

/** ネットワークURLの生成結果です。 / Result of creating a network URL. */
export type ServerCreateNetworkReturn = { networkUrl: string; isLAN: boolean };

/** ブラウザーを開くための引数です。 / Arguments for opening a browser. */
export type ServerOpenBrowserArgs = {
    host: string;
    port: number;
    target: BrowserTarget;
};

/** Express設定の生成結果です。 / Result of creating the Express configuration. */
export type ServerCreateExpressConfigReturn = {
    middlewares: express.RequestHandler[];
    api: string;
    publicDirectoryPath: string;
};

/** サーバー設定の生成結果です。 / Result of creating the server configuration. */
export type ServerCreateServerConfigReturn = {
    root: string;
    public: string;
    signalClose: boolean;
};
