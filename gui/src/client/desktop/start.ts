import type { WindowManager } from "@donneko/window-system";
import type { DesktopWindowDefinition } from "./definitions";
import { openDesktopWindow } from "./open-window";

export function startDesktop({
    document,
    windows,
    definitions,
}: {
    document: Document;
    windows: Pick<WindowManager, "createWindow" | "getWindows" | "updateWindow">;
    definitions: DesktopWindowDefinition[];
}): void {
    for (const button of document.querySelectorAll<HTMLButtonElement>("[data-window-id]")) {
        button.addEventListener("click", () => {
            const definition = definitions.find((item) => item.id === button.dataset.windowId);
            if (definition) openDesktopWindow({ windows, definition });
        });
    }
}
