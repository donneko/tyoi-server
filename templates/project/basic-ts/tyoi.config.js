import { defineConfig } from "@donneko/tyoi-server";
import morgan from "morgan";

export default defineConfig({
    port: 3000,
    autoPort: true,

    public: "./public/main",
    api: "/api",

    lan: false,
    qr: false,

    browser: true,

    middlewares: [morgan("dev")],
});
