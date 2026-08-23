import type { GuiLogEntry } from "./gui.type.js";
import type { OutEventBusMap } from "../types/server-event.type.js";

type ServerLog = Exclude<OutEventBusMap["server/log:*"], void>;

export type GuiLogStore = {
    add: (data: ServerLog | void) => GuiLogEntry | undefined;
    list: () => GuiLogEntry[];
};

export function createGuiLogStore(limit: number): GuiLogStore {
    const logs: GuiLogEntry[] = [];

    return {
        add(data) {
            if (!data) return undefined;
            const entry: GuiLogEntry = {
                type: data.type,
                message: data.message,
                createMessage: data.createMessage,
                date: data.date,
            };
            logs.unshift(entry);
            logs.splice(limit);
            return entry;
        },
        list: () => [...logs],
    };
}
