import { expectTypeOf, it } from "vitest";

type PublicApi = typeof import("./index.js");

it("does not expose the internal resolved config type", () => {
    expectTypeOf<"ResolvedServerConfig">().not.toExtend<keyof PublicApi>();
});
