import { describe, expect, it } from "vitest";
import { getServerPort } from "../../templates/project/realtime-ts/src/server-port.js";

describe("realtime template server port", () => {
    it.each([undefined, "not-a-port", "-1", "65536", "3000.5"])(
        "invalid PORT %s falls back to 3000",
        (value) => {
            expect(getServerPort(value)).toBe(3000);
        }
    );

    it("accepts a valid PORT", () => {
        expect(getServerPort("8080")).toBe(8080);
    });
});
