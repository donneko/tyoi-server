import { defineDefaultConfig } from "./define-config.js";

export default defineDefaultConfig({
    port: 3000,
    autoPort: false,

    public: "../public/main",
    api: "/api",

    middlewares: [],

    lan: false,
    qr: false,

    browser: false,

    signalClose: true,

    language: "ja-JP",
});
