export type ConnectionState = "connected" | "connecting" | "disconnected" | "error";

export type ServerStatus = {
    state: "running" | "stopped";
    port: number;
    uptimeSeconds: number;
    lastUpdated: string;
};

export type SummaryResponse = {
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
    gui: boolean | { allowLan?: boolean };
};

export type LogEntry = {
    type: string;
    message: string;
    createMessage: string;
    date: number;
};

export type LogResponse = { logs: LogEntry[] };

export type WebSocketMessage =
    | { type: "snapshot"; summary: SummaryResponse; status: ServerStatus; logs: LogEntry[] }
    | { type: "log"; log: LogEntry };
