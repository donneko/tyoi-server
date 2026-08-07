import path from "node:path";
import { parseDictionary } from "./read-language.js";
import type { MessageVariables } from "./types/message.type.js";

export class MessageManager {
    private readonly languagePath: string;
    private readonly defaultDictionaries: Record<string, string>;
    private dictionaries: Record<string, string> = {};

    constructor(defaultLanguage: string, languagesPath: string) {
        this.languagePath = languagesPath;

        this.defaultDictionaries = parseDictionary(
            path.join(languagesPath, `${defaultLanguage}.json`)
        );
    }

    setLanguage(language: string): void {
        this.dictionaries = parseDictionary(path.join(this.languagePath, `${language}.json`));
    }

    message(key: string, variables: MessageVariables = {}): string {
        const selectedMessages = this.dictionaries;
        const defaultMessages = this.defaultDictionaries;
        const template = selectedMessages?.[key] ?? defaultMessages?.[key];

        if (template === undefined) {
            throw new Error(`Message key not found: ${key}`);
        }

        return template.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (_, variable: string) => {
            if (!Object.hasOwn(variables, variable)) {
                throw new Error(`Message variable not found: ${variable} (key=${key})`);
            }
            return String(variables[variable]);
        });
    }
}
