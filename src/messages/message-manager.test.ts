import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { MessageManager } from "./message-manager.js";

const temporaryDirectories: string[] = [];

function createLanguages(dictionaries: Array<{ file: string; value: unknown }>): string {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "tyoi-messages-"));
    temporaryDirectories.push(directory);

    for (const dictionary of dictionaries) {
        fs.writeFileSync(
            path.join(directory, dictionary.file),
            typeof dictionary.value === "string"
                ? dictionary.value
                : JSON.stringify(dictionary.value)
        );
    }

    return directory;
}

afterEach(() => {
    for (const directory of temporaryDirectories.splice(0)) {
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

describe("MessageManager", () => {
    it("指定言語のメッセージを取得する", () => {
        const directory = createLanguages([
            {
                file: "ja-JP.json",
                value: { locale: "ja-JP", messages: { greeting: "こんにちは" } },
            },
            {
                file: "en-US.json",
                value: { locale: "en-US", messages: { greeting: "Hello" } },
            },
        ]);
        const manager = new MessageManager("ja-JP", directory);

        manager.setLanguage("en-US");

        expect(manager.message("greeting")).toBe("Hello");
    });

    it("選択言語またはキーがなければ既定言語へフォールバックする", () => {
        const directory = createLanguages([
            {
                file: "ja-JP.json",
                value: { locale: "ja-JP", messages: { greeting: "こんにちは" } },
            },
            {
                file: "en-US.json",
                value: { locale: "en-US", messages: {} },
            },
        ]);
        const manager = new MessageManager("ja-JP", directory);

        manager.setLanguage("en-US");
        expect(manager.message("greeting")).toBe("こんにちは");

        manager.setLanguage("unknown");
        expect(manager.message("greeting")).toBe("こんにちは");
    });

    it("名前付き変数をすべて置換し、余分な変数は無視する", () => {
        const directory = createLanguages([
            {
                file: "ja-JP.json",
                value: {
                    locale: "ja-JP",
                    messages: { port: "port={port}, again={port}" },
                },
            },
        ]);
        const manager = new MessageManager("ja-JP", directory);

        expect(manager.message("port", { port: 3000, unused: true })).toBe("port=3000, again=3000");
    });

    it("未知のキーと不足した変数を明示的な例外にする", () => {
        const directory = createLanguages([
            {
                file: "ja-JP.json",
                value: { locale: "ja-JP", messages: { port: "port={port}" } },
            },
        ]);
        const manager = new MessageManager("ja-JP", directory);

        expect(() => manager.message("missing.key")).toThrow("Message key not found: missing.key");
        expect(() => manager.message("port")).toThrow(
            "Message variable not found: port (key=port)"
        );
    });

    it("存在しない辞書ディレクトリを初期化エラーにする", () => {
        expect(() => new MessageManager("ja-JP", "/path/that/does/not/exist")).toThrow(
            "Failed to read languages directory"
        );
    });

    it("壊れた JSON を初期化エラーにする", () => {
        const directory = createLanguages([{ file: "ja-JP.json", value: "{" }]);

        expect(() => new MessageManager("ja-JP", directory)).toThrow(
            "Failed to read language dictionary"
        );
    });

    it.each([
        { locale: 123, messages: {} },
        { locale: "ja-JP", messages: [] },
        { locale: "ja-JP", messages: { greeting: 123 } },
    ])("不正な辞書スキーマを初期化エラーにする: %j", (value) => {
        const directory = createLanguages([{ file: "ja-JP.json", value }]);

        expect(() => new MessageManager("ja-JP", directory)).toThrow(/Invalid/);
    });

    it("既定言語の辞書がなければ初期化エラーにする", () => {
        const directory = createLanguages([
            {
                file: "en-US.json",
                value: { locale: "en-US", messages: { greeting: "Hello" } },
            },
        ]);

        expect(() => new MessageManager("ja-JP", directory)).toThrow(
            "Default language dictionary not found: ja-JP"
        );
    });
});
