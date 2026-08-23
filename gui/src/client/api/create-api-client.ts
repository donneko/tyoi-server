import type { LogResponse, ServerStatus, SummaryResponse } from "../../types/main.type";

export type ApiClient = {
    getSummary: () => Promise<SummaryResponse>;
    getStatus: () => Promise<ServerStatus>;
    getLog: () => Promise<LogResponse>;
};

export function createApiClient({
    fetch,
    baseUrl,
}: {
    fetch: typeof globalThis.fetch;
    baseUrl: string;
}): ApiClient {
    async function get<T>(path: string): Promise<T> {
        const response = await fetch(`${baseUrl}${path}`);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        return (await response.json()) as T;
    }

    return {
        getSummary: () => get<SummaryResponse>("/summary"),
        getStatus: () => get<ServerStatus>("/status"),
        getLog: () => get<LogResponse>("/log"),
    };
}
