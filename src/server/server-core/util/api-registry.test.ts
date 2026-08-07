import { expect, describe, test, vi } from "vitest";
import { HandlerRegistry } from "./api-registry.js";

describe("HandlerRegistry", () => {
    const apiRegistry = new HandlerRegistry();
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

    test("old unsubscribe does not remove the overwritten handler", async () => {
        const registry = new HandlerRegistry<{ event: object }>();
        const oldHandler = vi.fn();
        const currentHandler = vi.fn();
        const unsubscribe = registry.on("event", oldHandler);

        registry.on("event", currentHandler);
        unsubscribe();
        await registry.emit("event", {});

        expect(currentHandler).toHaveBeenCalledOnce();
    });
});
