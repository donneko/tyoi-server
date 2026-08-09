import { describe, expect, it, vi } from "vitest";

const readlineState = vi.hoisted(() => ({
    question: vi.fn(),
    close: vi.fn(),
}));

vi.mock("node:readline/promises", () => ({
    default: {
        createInterface: vi.fn(() => readlineState),
    },
}));

import { askPermission } from "./ask-permission.js";

describe("askPermission", () => {
    it("質問が失敗しても readline interface を閉じる", async () => {
        const error = new Error("stdin closed");
        readlineState.question.mockRejectedValueOnce(error);

        await expect(askPermission("continue?")).rejects.toBe(error);
        expect(readlineState.close).toHaveBeenCalledOnce();
    });
});
