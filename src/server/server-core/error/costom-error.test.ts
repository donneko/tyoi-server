import { describe, expect, it } from "vitest";
import { CustomError } from "./custom-error.js";

describe("CustomError", () => {
    it("CustomErrorとして生成できる", () => {
        const error = new CustomError("失敗しました");

        expect(error).toBeInstanceOf(CustomError);
    });

    it("Errorとしても判定できる", () => {
        const error = new CustomError("失敗しました");

        expect(error).toBeInstanceOf(Error);
    });

    it("messageとnameを保持する", () => {
        const error = new CustomError("失敗しました");

        expect(error.message).toBe("失敗しました");
        expect(error.name).toBe("CustomError");
    });

    it("causeを保持する", () => {
        const cause = new TypeError("元のエラー");

        const error = new CustomError("処理に失敗しました", {
            cause,
        });

        expect(error.cause).toBe(cause);
    });

    it("throw でも確認できる", () => {
        const run = () => {
            const cause = new TypeError("元のエラー");

            const error = new CustomError("処理に失敗しました", {
                cause,
            });

            throw error;
        };
        expect(run).toThrow("処理に失敗しました");
    });
});
