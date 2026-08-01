import fs from "fs/promises";
import path from "node:path";

export async function getConfigJson(): Promise<Record<string, unknown>> {
    const configPath = path.join(process.cwd(), ".tyoi-server/config.json");

    try {
        const file = await fs.readFile(configPath, { encoding: "utf-8" });
        const json = JSON.parse(file);
        return json;
    } catch {
        return {};
    }
}
