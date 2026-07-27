import { describe, expect, it, vi } from "vitest";
import { createNetworkData } from "./create-network-data.js";

describe("createNetworkData", () => {
    it("LAN 公開時は LAN IP を使った URL を返す", () => {
        const getLanIp = vi.fn(() => "192.168.1.10");

        expect(createNetworkData(3000, "0.0.0.0", { getLanIp })).toEqual({
            networkUrl: "http://192.168.1.10:3000",
            isLAN: true,
        });
        expect(getLanIp).toHaveBeenCalledOnce();
    });

    it("ローカル公開時は isLAN を false にする", () => {
        expect(
            createNetworkData(8080, "127.0.0.1", {
                getLanIp: vi.fn(() => "localhost"),
            })
        ).toEqual({
            networkUrl: "http://localhost:8080",
            isLAN: false,
        });
    });
});
