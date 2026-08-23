import { describe, expect, it, vi } from "vitest";
import { connectUpdates } from "./connect-updates";

describe("connectUpdates", () => {
    it("reports messages and closes the active socket", () => {
        const socket = {
            close: vi.fn(),
            onopen: null,
            onmessage: null,
            onerror: null,
            onclose: null,
        };
        const Socket = vi.fn(function Socket() {
            return socket;
        });
        const onState = vi.fn();
        const onMessage = vi.fn();

        const disconnect = connectUpdates({
            url: "ws://localhost/__tyoi/ws",
            WebSocket: Socket as never,
            setTimeout: vi.fn() as never,
            clearTimeout: vi.fn(),
            onState,
            onMessage,
        });
        const connectedSocket = socket as unknown as Pick<WebSocket, "onopen" | "onmessage">;
        connectedSocket.onopen?.call(socket as unknown as WebSocket, {} as Event);
        connectedSocket.onmessage?.call(
            socket as unknown as WebSocket,
            {
                data: JSON.stringify({ type: "log", log: { message: "ok" } }),
            } as MessageEvent
        );
        disconnect();

        expect(onState).toHaveBeenCalledWith("connecting");
        expect(onState).toHaveBeenCalledWith("connected");
        expect(onMessage).toHaveBeenCalledWith(expect.objectContaining({ type: "log" }));
        expect(socket.close).toHaveBeenCalled();
    });
});
