import { expectTypeOf, it } from "vitest";
import { apiResponse } from "./index.js";
import type { ApiResponse, RequestData } from "./index.js";

type PublicApi = typeof import("./index.js");

it("does not expose the internal resolved config type", () => {
    expectTypeOf<"ResolvedServerConfig">().not.toExtend<keyof PublicApi>();
});

it("exports typed route parameters and API responses", () => {
    expectTypeOf<RequestData["params"]>().toEqualTypeOf<
        Readonly<Record<string, string | string[]>> | undefined
    >();
    expectTypeOf(apiResponse({ id: 1 }, { status: 201 })).toEqualTypeOf<
        ApiResponse<{ id: number }>
    >();
});
