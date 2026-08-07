import { defineConfig } from "../server/index.js";

export default defineConfig({
    port: 3000,
    autoPort: true,

    public: "../public/main",
    api: "/api",

    lan: false,
    qr: false,

    browser: true,
});
