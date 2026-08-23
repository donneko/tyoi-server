import { describe, expect, it } from "vitest";
import { isGuiRequestAllowed, isLoopbackAddress } from "./access.js";

describe("GUI access control", () => {
    it.each([
        "127.0.0.1",
        "127.20.30.40",
        "::1",
        "0:0:0:0:0:0:0:1",
        "::ffff:127.0.0.1",
        "::ffff:7f00:1",
        "0:0:0:0:0:ffff:7f01:203",
    ])("accepts loopback address %s", (address) => expect(isLoopbackAddress(address)).toBe(true));

    it.each([undefined, "192.168.1.20", "10.0.0.4", "::ffff:192.168.1.20"])(
        "rejects non-loopback address %s",
        (address) => expect(isLoopbackAddress(address)).toBe(false)
    );

    it("allows any address only when LAN access is enabled", () => {
        expect(isGuiRequestAllowed(false, "192.168.1.20")).toBe(false);
        expect(isGuiRequestAllowed(true, "192.168.1.20")).toBe(true);
    });
});
