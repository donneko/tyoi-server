import { expect, describe, test, vi } from "vitest";
import { ApiRegistry } from "./api-registry.js";

describe("ApiRegistry", () => {
    const apiRegistry = new ApiRegistry();
    const onceCallback = vi.fn();
    const onCallback = vi.fn();

    test("once 登録", () => {
        apiRegistry.once("a", onceCallback);
    });
    test("has 存在確認", () => {
        apiRegistry.has("a");
    });
    test("emit 着火", () => {
        apiRegistry.emit("a", {});
        expect(onceCallback).toHaveBeenCalledTimes(1);
    });

    test("on 登録", () => {
        apiRegistry.on("b", onCallback);
    });
    test("has 存在確認", () => {
        apiRegistry.has("b");
    });
    test("off 解除", () => {
        apiRegistry.off("b");
    });
    test("emit 発火", () => {
        apiRegistry.emit("b", {});
        expect(onCallback).toHaveBeenCalledTimes(0);
    });
    test("stale unsubscribe does not remove a replacement handler", async () => {
        const registry = new ApiRegistry<Record<"c", object>>();
        const oldCallback = vi.fn();
        const newCallback = vi.fn();
        const unsubscribe = registry.on("c", oldCallback);

        registry.on("c", newCallback);
        unsubscribe();
        await registry.emit("c", {});

        expect(newCallback).toHaveBeenCalledTimes(1);
    });
});
