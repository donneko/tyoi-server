import type { ApiClient } from "../api/create-api-client";
import type { ConnectionState, LogEntry, WebSocketMessage } from "../../types/main.type";

function createLogElement(document: Document, log: LogEntry): HTMLLIElement {
    const item = document.createElement("li");
    item.className = log.type.toLowerCase();
    item.textContent = `${new Date(log.date).toLocaleTimeString()} [${log.type}] ${log.message}`;
    return item;
}

function renderLogs(document: Document, container: HTMLElement, logs: LogEntry[]): void {
    container.replaceChildren(...logs.map((log) => createLogElement(document, log)));
}

export function startLogPage(
    document: Document,
    api: ApiClient,
    connect: (options: {
        onState: (state: ConnectionState) => void;
        onMessage: (message: WebSocketMessage) => void;
    }) => () => void
): void {
    const list = document.querySelector<HTMLElement>("#logs");
    const connection = document.querySelector<HTMLElement>("#connection");
    if (!list || !connection) return;
    void api.getLog().then(
        ({ logs }) => renderLogs(document, list, logs),
        () => {
            connection.textContent = "API error";
        }
    );
    connect({
        onState: (state) => {
            connection.textContent = state;
        },
        onMessage: (message) => {
            if (message.type === "snapshot") renderLogs(document, list, message.logs);
            if (message.type === "log") {
                list.prepend(createLogElement(document, message.log));
                while (list.children.length > 30) list.lastElementChild?.remove();
            }
        },
    });
}
