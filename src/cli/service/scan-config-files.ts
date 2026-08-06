import path from "path";
import fs from "fs/promises";
import { readDirectory } from "./read-directory.js";

export async function scanConfigFiles(passedPath: string): Promise<string[]> {
    const regex = /^(tyoi)\.([A-Za-z0-9.]+(\.config)|config)\.(js)$/;

    const current = await readDirectory(passedPath);
    const filteredCurrent = current.filter((file) => regex.test(file));

    const configPath = path.join(passedPath, "config");
    try {
        if (!(await fs.stat(configPath)).isDirectory()) return filteredCurrent.toSorted();
    } catch {
        return filteredCurrent.toSorted();
    }

    const configFiles = await readDirectory(configPath, true);
    const filteredConfigFiles = configFiles
        .filter((file) => {
            const fileName = path.basename(file);
            return regex.test(fileName);
        })
        .map((value) => {
            return `config${path.sep}${value}`;
        });

    return filteredCurrent.concat(filteredConfigFiles).toSorted();
}
