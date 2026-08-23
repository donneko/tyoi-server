import type { ApiClient } from "../api/create-api-client";
import type { SummaryResponse } from "../../types/main.type";

function render(document: Document, container: HTMLElement, summary: SummaryResponse): void {
    const list = document.createElement("dl");
    list.className = "summary-list";
    for (const [key, value] of Object.entries(summary)) {
        const term = document.createElement("dt");
        term.textContent = key;
        const detail = document.createElement("dd");
        detail.textContent =
            typeof value === "object" ? JSON.stringify(value) : String(value ?? "-");
        list.append(term, detail);
    }
    container.replaceChildren(list);
}

export async function startSummaryPage(document: Document, api: ApiClient): Promise<void> {
    const content = document.querySelector<HTMLElement>("#content");
    if (!content) return;
    try {
        render(document, content, await api.getSummary());
    } catch (error) {
        content.textContent = `API に接続できません: ${error instanceof Error ? error.message : "unknown error"}`;
        content.className = "error";
    }
}
