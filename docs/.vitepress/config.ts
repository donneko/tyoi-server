import { defineConfig } from "vitepress";
import typedocSidebar from "../api/reference/typedoc-sidebar.json";

export default defineConfig({
    title: "tyoi-server",
    description: "Express と TypeScript で構成されたローカル API・静的ファイルサーバー",
    base: "/tyoi-api-node-server/",
    themeConfig: {
        nav: [
            { text: "ホーム", link: "/" },
            { text: "クイックスタート", link: "/quick-start/use/getting-started" },
            { text: "API", link: "/api/use/http-api" },
            { text: "CLI", link: "/command/specification/commands" },
            { text: "設定", link: "/config/specification/options" },
        ],
        sidebar: [
            {
                text: "クイックスタート",
                items: [
                    { text: "はじめる", link: "/quick-start/use/getting-started" },
                    { text: "動作要件と構成", link: "/quick-start/specification/requirements" },
                ],
            },
            {
                text: "API",
                collapsed: false,
                items: [
                    { text: "HTTP API を作る", link: "/api/use/http-api" },
                    { text: "WebSocket を使う", link: "/api/use/websocket" },
                    { text: "ライフサイクルとイベント", link: "/api/use/lifecycle-and-events" },
                    { text: "tyoi / ShortHandler", link: "/api/specification/short-handler" },
                    { text: "Server", link: "/api/specification/server" },
                    { text: "通信仕様", link: "/api/specification/protocol" },
                ],
            },
            {
                text: "CLI コマンド",
                collapsed: false,
                items: [
                    { text: "プロジェクト作成", link: "/command/use/project-creation" },
                    { text: "サーバー操作", link: "/command/use/server-operation" },
                    { text: "コマンド一覧", link: "/command/specification/commands" },
                    { text: "オプション", link: "/command/specification/options" },
                ],
            },
            {
                text: "設定",
                collapsed: false,
                items: [
                    { text: "基本設定", link: "/config/use/basic" },
                    { text: "LAN と middleware", link: "/config/use/lan-and-middleware" },
                    { text: "設定項目", link: "/config/specification/options" },
                    { text: "読み込みと優先順位", link: "/config/specification/loading-and-precedence" },
                ],
            },
            {
                text: "テンプレート例",
                collapsed: true,
                items: [
                    { text: "テンプレートの使い方", link: "/example/use/templates" },
                    { text: "テンプレート一覧", link: "/example/specification/template-catalog" },
                ],
            },
            {
                text: "できること",
                collapsed: true,
                items: [
                    { text: "実践レシピ", link: "/can-do/use/recipes" },
                    { text: "機能と制約", link: "/can-do/specification/features-and-limitations" },
                ],
            },
            {
                text: "静的ファイル",
                collapsed: true,
                items: [
                    { text: "配信する", link: "/public/use/static-files" },
                    { text: "ルーティング仕様", link: "/public/specification/routing" },
                ],
            },
            {
                text: "自動生成 API リファレンス",
                collapsed: true,
                items: typedocSidebar,
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/donneko/tyoi-api-node-server" },
        ],
        search: { provider: "local" },
        outline: { level: [2, 3] },
    },
});
