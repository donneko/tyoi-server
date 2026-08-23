import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const astroPackagePath = require.resolve("astro/package.json");
const astroCliPath = path.join(path.dirname(astroPackagePath), "astro.js");
const result = spawnSync(
    process.execPath,
    [astroCliPath, "build", "--config", "astro.config.mjs"],
    {
        cwd: path.join(import.meta.dirname, "../gui"),
        encoding: "utf8",
    }
);

// npm pack --json requires stdout to contain JSON only. Keep Astro's build log on stderr.
if (result.stdout) process.stderr.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
