// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
    srcDir: "./src",
    outDir: "../dist/gui",
    cacheDir: "../.astro/gui",
    publicDir: "./public",
    base: "/__tyoi",
    output: "static",
    trailingSlash: "always",
});
