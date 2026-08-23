import { describe, expect, it } from "vitest";
import { createGuiLogStore } from "./log-store.js";

describe("createGuiLogStore", () => {
    it("ignores empty events and keeps the newest entries", () => {
        const store = createGuiLogStore(2);
        store.add(undefined);
        store.add({ type: "INFO", message: "one", createMessage: "one", date: 1 });
        store.add({ type: "WARN", message: "two", createMessage: "two", date: 2 });
        store.add({ type: "ERROR", message: "three", createMessage: "three", date: 3 });

        expect(store.list().map((log) => log.message)).toEqual(["three", "two"]);
    });

    it("returns a copy of the stored log list", () => {
        const store = createGuiLogStore(2);
        store.add({ type: "INFO", message: "one", createMessage: "one", date: 1 });
        store.list().length = 0;
        expect(store.list()).toHaveLength(1);
    });
});
