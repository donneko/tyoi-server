import type { ApiClient } from "../api/create-api-client";
import type { ConnectionState, ServerStatus, WebSocketMessage } from "../../types/main.type";

function renderStatus(document: Document, status: ServerStatus): void {
    const values = {
        state: status.state,
        port: String(status.port),
        uptime: `${status.uptimeSeconds}s`,
        updated: new Date(status.lastUpdated).toLocaleTimeString(),
    };
    for (const [id, value] of Object.entries(values)) {
        const element = document.querySelector<HTMLElement>(`#${id}`);
        if (element) element.textContent = value;
    }
}

function renderConnection(document: Document, state: ConnectionState): void {
    const element = document.querySelector<HTMLElement>("#connection");
    if (!element) return;
    element.textContent = state;
    element.className = state;
}

export function startStatusPage(
    document: Document,
    api: ApiClient,
    connect: (options: {
        onState: (state: ConnectionState) => void;
        onMessage: (message: WebSocketMessage) => void;
    }) => () => void
): void {
    void api.getStatus().then(
        (status) => renderStatus(document, status),
        () => renderConnection(document, "error")
    );
    connect({
        onState: (state) => renderConnection(document, state),
        onMessage: (message) => {
            if (message.type === "snapshot") renderStatus(document, message.status);
        },
    });
}
