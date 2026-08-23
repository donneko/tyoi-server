import { describe, expect, it, vi } from "vitest";
import type { DesktopWindowDefinition } from "./definitions";
import { openDesktopWindow } from "./open-window";

const definition: DesktopWindowDefinition = {
    id: "summary",
    title: "Summary",
    contentUrl: "/__tyoi/summary/",
    x: 32,
    y: 32,
    width: 350,
    height: 260,
    minWidth: 280,
    minHeight: 180,
};

describe("openDesktopWindow", () => {
    it("creates a window when it is not open", () => {
        const windows = { getWindows: () => [], createWindow: vi.fn(), updateWindow: vi.fn() };
        openDesktopWindow({ windows, definition });
        expect(windows.createWindow).toHaveBeenCalledWith(definition);
    });

    it("restores an existing window instead of duplicating it", () => {
        const windows = {
            getWindows: () => [{ id: "summary" }],
            createWindow: vi.fn(),
            updateWindow: vi.fn(),
        };
        openDesktopWindow({ windows: windows as never, definition });
        expect(windows.createWindow).not.toHaveBeenCalled();
        expect(windows.updateWindow).toHaveBeenCalledWith("summary", {
            status: { isActive: true, isHidden: false, isMinimized: false },
        });
    });
});
