import { expect, describe, test } from "vitest";
import { getLanIp } from "./get-lan-ip.js";

describe("getLanIp", () => {
    test("", () => {
        const ip = getLanIp();

        expect(ip).toEqual(expect.any(String));
    });
});
