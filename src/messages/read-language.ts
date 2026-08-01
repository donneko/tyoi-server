import fs from "node:fs";
import type { LanguageDictionary } from "./types/message.type.js";

export function parseDictionary(filePath: string): LanguageDictionary {
    let value: unknown;

    try {
        value = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (cause) {
        throw new Error(`Failed to read language dictionary: ${filePath}`, { cause });
    }

    if (!value || typeof value !== "object") {
        throw new Error(`Invalid language dictionary: ${filePath}`);
    }

    const invalidKey = Object.entries(value).find(([, message]) => typeof message !== "string");
    if (invalidKey) {
        throw new Error(`Invalid message value for key "${invalidKey[0]}": ${filePath}`);
    }

    return value as LanguageDictionary;
}
