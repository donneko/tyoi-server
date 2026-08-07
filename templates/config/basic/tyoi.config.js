import { defineConfig } from "@donneko/tyoi-server";
import morgan from "morgan";

export default defineConfig({
    port: 3000,
    autoPort: true,

    public: "./public/main",
    api: "/api",

    lan: false,
    qr: false,

    browser: false,

    middlewares: [morgan("dev")],
});
