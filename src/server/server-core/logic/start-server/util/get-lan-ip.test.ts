import { expect, describe, it, vi } from "vitest";
import { getLanIp } from "./get-lan-ip.js";

describe("getLanIp", () => {
    it("", () => {
        const deps = {
            networkInterfaces: vi.fn(),
        };

        const ip = getLanIp(deps);

        expect(ip).toEqual(expect.any(String));
    });
});
