import { defineConfig } from "@donneko/tyoi-server";

export default defineConfig({
    port: 3000,
    autoPort: true,
    public: "./public/main",
    api: "/api",
    browser: false,
});
