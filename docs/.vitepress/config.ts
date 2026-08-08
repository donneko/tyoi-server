import { defineConfig } from "vitepress";
import typedocSidebarJa from "../api/reference/typedoc-sidebar.json";
import typedocSidebarEn from "../en/api/reference/typedoc-sidebar.json";

const socialLinks = [
    { icon: "github" as const, link: "https://github.com/donneko/tyoi-api-node-server" },
];

export default defineConfig({
    title: "tyoi-server",
    description: "A local API and static file server built with Express and TypeScript",
    base: "/tyoi-api-node-server/",
    locales: {
        root: {
            label: "日本語",
            lang: "ja-JP",
            description: "Express と TypeScript で構成されたローカル API・静的ファイルサーバー",
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
                            {
                                text: "動作要件と構成",
                                link: "/quick-start/specification/requirements",
                            },
                            { text: "v1.0.0 移行ガイド", link: "/migration-v1" },
                        ],
                    },
                    {
                        text: "API",
                        collapsed: false,
                        items: [
                            { text: "HTTP API を作る", link: "/api/use/http-api" },
                            { text: "WebSocket を使う", link: "/api/use/websocket" },
                            {
                                text: "ライフサイクルとイベント",
                                link: "/api/use/lifecycle-and-events",
                            },
                            {
                                text: "tyoi / ShortHandler",
                                link: "/api/specification/short-handler",
                            },
                            { text: "Server", link: "/api/specification/server" },
                            { text: "通信仕様", link: "/api/specification/protocol" },
                        ],
                    },
                    {
                        text: "CLI コマンド",
                        collapsed: false,
                        items: [
                            {
                                text: "プロジェクト作成",
                                link: "/command/use/project-creation",
                            },
                            { text: "サーバー操作", link: "/command/use/server-operation" },
                            {
                                text: "コマンド一覧",
                                link: "/command/specification/commands",
                            },
                            { text: "オプション", link: "/command/specification/options" },
                        ],
                    },
                    {
                        text: "設定",
                        collapsed: false,
                        items: [
                            { text: "基本設定", link: "/config/use/basic" },
                            {
                                text: "LAN と middleware",
                                link: "/config/use/lan-and-middleware",
                            },
                            { text: "設定項目", link: "/config/specification/options" },
                            {
                                text: "読み込みと優先順位",
                                link: "/config/specification/loading-and-precedence",
                            },
                        ],
                    },
                    {
                        text: "テンプレート例",
                        collapsed: true,
                        items: [
                            { text: "テンプレートの使い方", link: "/example/use/templates" },
                            {
                                text: "テンプレート一覧",
                                link: "/example/specification/template-catalog",
                            },
                        ],
                    },
                    {
                        text: "できること",
                        collapsed: true,
                        items: [
                            { text: "実践レシピ", link: "/can-do/use/recipes" },
                            {
                                text: "機能と制約",
                                link: "/can-do/specification/features-and-limitations",
                            },
                        ],
                    },
                    {
                        text: "静的ファイル",
                        collapsed: true,
                        items: [
                            { text: "配信する", link: "/public/use/static-files" },
                            {
                                text: "ルーティング仕様",
                                link: "/public/specification/routing",
                            },
                        ],
                    },
                    {
                        text: "自動生成 API リファレンス",
                        collapsed: true,
                        items: typedocSidebarJa,
                    },
                ],
                socialLinks,
                search: {
                    provider: "local",
                    options: {
                        translations: {
                            button: {
                                buttonText: "検索",
                                buttonAriaLabel: "ドキュメントを検索",
                            },
                            modal: {
                                displayDetails: "詳細を表示",
                                resetButtonTitle: "検索をリセット",
                                backButtonTitle: "検索を閉じる",
                                noResultsText: "該当する結果がありません",
                                footer: {
                                    selectText: "選択",
                                    navigateText: "移動",
                                    closeText: "閉じる",
                                },
                            },
                        },
                    },
                },
                outline: { level: [2, 3], label: "このページの内容" },
                docFooter: { prev: "前のページ", next: "次のページ" },
                sidebarMenuLabel: "メニュー",
                returnToTopLabel: "トップへ戻る",
                langMenuLabel: "言語を変更",
                skipToContentLabel: "本文へ移動",
                i18nRouting: true,
            },
        },
        en: {
            label: "English",
            lang: "en-US",
            link: "/en/",
            themeConfig: {
                nav: [
                    { text: "Home", link: "/en/" },
                    { text: "Quick start", link: "/en/quick-start/use/getting-started" },
                    { text: "API", link: "/en/api/use/http-api" },
                    { text: "CLI", link: "/en/command/specification/commands" },
                    { text: "Configuration", link: "/en/config/specification/options" },
                ],
                sidebar: [
                    {
                        text: "Quick start",
                        items: [
                            {
                                text: "Getting started",
                                link: "/en/quick-start/use/getting-started",
                            },
                            {
                                text: "Requirements and structure",
                                link: "/en/quick-start/specification/requirements",
                            },
                            { text: "v1.0.0 migration guide", link: "/en/migration-v1" },
                        ],
                    },
                    {
                        text: "API",
                        collapsed: false,
                        items: [
                            { text: "Build an HTTP API", link: "/en/api/use/http-api" },
                            { text: "Use WebSocket", link: "/en/api/use/websocket" },
                            {
                                text: "Lifecycle and events",
                                link: "/en/api/use/lifecycle-and-events",
                            },
                            {
                                text: "tyoi / ShortHandler",
                                link: "/en/api/specification/short-handler",
                            },
                            { text: "Server", link: "/en/api/specification/server" },
                            { text: "Protocol", link: "/en/api/specification/protocol" },
                        ],
                    },
                    {
                        text: "CLI commands",
                        collapsed: false,
                        items: [
                            {
                                text: "Create a project",
                                link: "/en/command/use/project-creation",
                            },
                            {
                                text: "Operate the server",
                                link: "/en/command/use/server-operation",
                            },
                            {
                                text: "Command reference",
                                link: "/en/command/specification/commands",
                            },
                            { text: "Options", link: "/en/command/specification/options" },
                        ],
                    },
                    {
                        text: "Configuration",
                        collapsed: false,
                        items: [
                            { text: "Basic configuration", link: "/en/config/use/basic" },
                            {
                                text: "LAN and middleware",
                                link: "/en/config/use/lan-and-middleware",
                            },
                            { text: "Options", link: "/en/config/specification/options" },
                            {
                                text: "Loading and precedence",
                                link: "/en/config/specification/loading-and-precedence",
                            },
                        ],
                    },
                    {
                        text: "Templates",
                        collapsed: true,
                        items: [
                            { text: "Use templates", link: "/en/example/use/templates" },
                            {
                                text: "Template catalog",
                                link: "/en/example/specification/template-catalog",
                            },
                        ],
                    },
                    {
                        text: "Features",
                        collapsed: true,
                        items: [
                            { text: "Practical recipes", link: "/en/can-do/use/recipes" },
                            {
                                text: "Features and limitations",
                                link: "/en/can-do/specification/features-and-limitations",
                            },
                        ],
                    },
                    {
                        text: "Static files",
                        collapsed: true,
                        items: [
                            { text: "Serve files", link: "/en/public/use/static-files" },
                            {
                                text: "Routing behavior",
                                link: "/en/public/specification/routing",
                            },
                        ],
                    },
                    {
                        text: "Generated API reference",
                        collapsed: true,
                        items: typedocSidebarEn,
                    },
                ],
                socialLinks,
                search: { provider: "local" },
                outline: { level: [2, 3], label: "On this page" },
                docFooter: { prev: "Previous page", next: "Next page" },
                sidebarMenuLabel: "Menu",
                returnToTopLabel: "Return to top",
                langMenuLabel: "Change language",
                skipToContentLabel: "Skip to content",
                i18nRouting: true,
            },
        },
    },
});
