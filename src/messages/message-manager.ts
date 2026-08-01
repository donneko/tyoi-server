import fs from "node:fs";
import path from "node:path";

export type MessageVariables = Record<string, string | number | boolean>;

type LanguageDictionary = {
    locale: string;
    messages: Record<string, string>;
};

function parseDictionary(filePath: string): LanguageDictionary {
    let value: unknown;

    try {
        value = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (cause) {
        throw new Error(`Failed to read language dictionary: ${filePath}`, { cause });
    }

    if (!value || typeof value !== "object") {
        throw new Error(`Invalid language dictionary: ${filePath}`);
    }

    const { locale, messages } = value as Record<string, unknown>;
    if (typeof locale !== "string" || locale.length === 0) {
        throw new Error(`Invalid language dictionary locale: ${filePath}`);
    }
    if (!messages || typeof messages !== "object" || Array.isArray(messages)) {
        throw new Error(`Invalid language dictionary messages: ${filePath}`);
    }

    const invalidKey = Object.entries(messages).find(([, message]) => typeof message !== "string");
    if (invalidKey) {
        throw new Error(`Invalid message value for key "${invalidKey[0]}": ${filePath}`);
    }

    return { locale, messages: messages as Record<string, string> };
}

export class MessageManager {
    private language: string;
    private readonly defaultLanguage: string;
    private readonly dictionaries = new Map<string, Record<string, string>>();

    constructor(defaultLanguage: string, languagesPath: string) {
        this.defaultLanguage = defaultLanguage;
        this.language = defaultLanguage;

        let files: string[];
        try {
            files = fs
                .readdirSync(languagesPath, { withFileTypes: true })
                .filter((entry) => entry.isFile() && path.extname(entry.name) === ".json")
                .map((entry) => entry.name)
                .sort();
        } catch (cause) {
            throw new Error(`Failed to read languages directory: ${languagesPath}`, { cause });
        }

        for (const file of files) {
            const dictionary = parseDictionary(path.join(languagesPath, file));
            if (this.dictionaries.has(dictionary.locale)) {
                throw new Error(`Duplicate language dictionary: ${dictionary.locale}`);
            }
            this.dictionaries.set(dictionary.locale, dictionary.messages);
        }

        if (!this.dictionaries.has(defaultLanguage)) {
            throw new Error(`Default language dictionary not found: ${defaultLanguage}`);
        }
    }

    setLanguage(language: string): void {
        this.language = language;
    }

    message(key: string, variables: MessageVariables = {}): string {
        const selectedMessages = this.dictionaries.get(this.language);
        const defaultMessages = this.dictionaries.get(this.defaultLanguage);
        const template = selectedMessages?.[key] ?? defaultMessages?.[key];

        if (template === undefined) {
            throw new Error(`Message key not found: ${key}`);
        }

        return template.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (_, variable: string) => {
            if (!(variable in variables)) {
                throw new Error(`Message variable not found: ${variable} (key=${key})`);
            }
            return String(variables[variable]);
        });
    }
}
