import type { WindowCreateConfig } from "@donneko/window-system";

export type DesktopWindowDefinition = Required<
    Pick<
        WindowCreateConfig,
        "id" | "title" | "contentUrl" | "x" | "y" | "width" | "height" | "minWidth" | "minHeight"
    >
>;

const base = import.meta.env.BASE_URL;

export const desktopWindows: DesktopWindowDefinition[] = [
    {
        id: "summary",
        title: "Summary",
        contentUrl: `${base}summary/`,
        x: 32,
        y: 32,
        width: 350,
        height: 300,
        minWidth: 280,
        minHeight: 180,
    },
    {
        id: "status",
        title: "Status",
        contentUrl: `${base}status/`,
        x: 405,
        y: 32,
        width: 350,
        height: 300,
        minWidth: 280,
        minHeight: 180,
    },
    {
        id: "log",
        title: "Log",
        contentUrl: `${base}log/`,
        x: 32,
        y: 355,
        width: 540,
        height: 330,
        minWidth: 280,
        minHeight: 180,
    },
];
