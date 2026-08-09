import { describe, expect, it, vi } from "vitest";
import type { RequestData } from "../types/public/api.type.js";
import { ApiRouter } from "./api-router.js";

type Routes = Record<string, RequestData>;

describe("ApiRouter", () => {
    it("matches named, wildcard, optional, and decoded parameters", () => {
        const router = new ApiRouter<Routes>();
        router.on("GET:/users/:id", () => undefined);
        router.on("GET:/files/*splat", () => undefined);
        router.on("GET:/reports{/:year}", () => undefined);

        expect(router.find("GET", "/users/a%20b")?.params).toEqual({ id: "a b" });
        expect(router.find("GET", "/files/a/b")?.params).toEqual({ splat: ["a", "b"] });
        expect(router.find("GET", "/reports")?.params).toEqual({});
        expect(router.find("GET", "/reports/2026")?.params).toEqual({ year: "2026" });
    });

    it("prefers static and then more specific dynamic routes", () => {
        const router = new ApiRouter<Routes>();
        router.on("GET:/users/:id", () => undefined);
        router.on("GET:/users/*splat", () => undefined);
        router.on("GET:/users/me", () => undefined);
        router.on("GET:/:scope/me", () => undefined);

        expect(router.find("GET", "/users/me")?.key).toBe("GET:/users/me");
        expect(router.find("GET", "/users/42")?.key).toBe("GET:/users/:id");
    });

    it("uses registration order when dynamic routes have equal specificity", () => {
        const router = new ApiRouter<Routes>();
        router.on("GET:/:first/value", () => undefined);
        router.on("GET:/:second/value", () => undefined);

        expect(router.find("GET", "/x/value")?.key).toBe("GET:/:first/value");
    });

    it("keeps exact has, off, and emit behavior", async () => {
        const router = new ApiRouter<Routes>();
        const handler = vi.fn(() => "result");
        router.on("GET:/users/:id", handler);

        expect(router.has("GET:/users/:id")).toBe(true);
        expect(router.has("GET:/users/1")).toBe(false);
        await expect(router.emit("GET:/users/:id", {})).resolves.toBe("result");
        router.off("GET:/users/:id");
        expect(router.find("GET", "/users/1")).toBeUndefined();
    });

    it("removes once routes after a matched route is emitted", async () => {
        const router = new ApiRouter<Routes>();
        const handler = vi.fn();
        router.once("GET:/users/:id", handler);
        const route = router.find("GET", "/users/1");

        await router.emit(route?.key ?? "", { params: route?.params });

        expect(handler).toHaveBeenCalledOnce();
        expect(router.find("GET", "/users/2")).toBeUndefined();
    });

    it("returns allowed methods in stable registration order", () => {
        const router = new ApiRouter<Routes>();
        router.on("PUT:/users/:id", () => undefined);
        router.on("GET:/users/:id", () => undefined);
        router.on("PUT:/users/*splat", () => undefined);

        expect(router.allowedMethods("/users/1")).toEqual(["PUT", "GET"]);
    });

    it("rejects invalid route patterns during registration", () => {
        const router = new ApiRouter<Routes>();

        expect(() => router.on("GET:/users/:", () => undefined)).toThrow(TypeError);
        expect(() => router.on("invalid", () => undefined)).toThrow(TypeError);
        expect(() => router.on("GET:users/:id", () => undefined)).toThrow(
            "Invalid API route path: users/:id"
        );
        expect(() => router.on("GET:", () => undefined)).toThrow("Invalid API route path: ");
    });

    it("does not let a stale unsubscribe remove an overwritten route", async () => {
        const router = new ApiRouter<Routes>();
        const oldHandler = vi.fn();
        const currentHandler = vi.fn();
        const unsubscribe = router.on("GET:/users/:id", oldHandler);
        router.on("GET:/users/:id", currentHandler);

        unsubscribe();
        await router.emit("GET:/users/:id", {});

        expect(oldHandler).not.toHaveBeenCalled();
        expect(currentHandler).toHaveBeenCalledOnce();
    });
});
