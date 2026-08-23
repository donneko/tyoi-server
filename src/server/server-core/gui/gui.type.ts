export type GuiSummary = {
    root: string | undefined;
    public: string;
    api: string;
    port: number;
    lan: boolean;
    qr: boolean;
    browser: boolean | "local" | "lan";
    autoPort: boolean;
    signalClose: boolean;
    language: string;
    gui: boolean | { allowLan?: boolean | undefined };
};

export type GuiStatus = {
    state: "running" | "stopped";
    port: number;
    uptimeSeconds: number;
    lastUpdated: string;
};

export type GuiLogEntry = {
    type: string;
    message: string;
    createMessage: string;
    date: number;
};

export type GuiWebSocketMessage =
    | { type: "snapshot"; summary: GuiSummary; status: GuiStatus; logs: GuiLogEntry[] }
    | { type: "log"; log: GuiLogEntry };
