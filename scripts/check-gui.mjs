import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const astroPackagePath = require.resolve("astro/package.json");
const astroCliPath = path.join(path.dirname(astroPackagePath), "astro.js");
const result = spawnSync(
    process.execPath,
    [astroCliPath, "check", "--config", "astro.config.mjs"],
    {
        cwd: path.join(import.meta.dirname, "../gui"),
        stdio: "inherit",
    }
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
