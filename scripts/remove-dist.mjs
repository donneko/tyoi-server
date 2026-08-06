import fs from "node:fs";
import path from "node:path";

function removeDist() {
    const dist = path.join(import.meta.dirname, "../dist");
    fs.rmSync(dist, { recursive: true, force: true });
}

removeDist();
