import type { WindowManager } from "@donneko/window-system";
import type { DesktopWindowDefinition } from "./definitions";

type DesktopWindowManager = Pick<WindowManager, "createWindow" | "getWindows" | "updateWindow">;

export function openDesktopWindow({
    windows,
    definition,
}: {
    windows: DesktopWindowManager;
    definition: DesktopWindowDefinition;
}): void {
    const existing = windows.getWindows().find((window) => window.id === definition.id);
    if (existing) {
        windows.updateWindow(existing.id, {
            status: { isActive: true, isHidden: false, isMinimized: false },
        });
        return;
    }
    windows.createWindow(definition);
}
