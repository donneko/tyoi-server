import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(repositoryRoot, "docs");
const englishRoot = join(docsRoot, "en");
const vitePressRoot = join(docsRoot, ".vitepress");
const japaneseReferenceRoot = join(docsRoot, "api", "reference");
const englishReferenceRoot = join(englishRoot, "api", "reference");

function listFiles(root, predicate = () => true) {
    const files = [];

    function visit(directory) {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
            const path = join(directory, entry.name);
            if (entry.isDirectory()) visit(path);
            else if (predicate(path)) files.push(relative(root, path).split(sep).join("/"));
        }
    }

    visit(root);
    return files.sort();
}

function compareFileSets(label, japaneseFiles, englishFiles, errors) {
    const japaneseSet = new Set(japaneseFiles);
    const englishSet = new Set(englishFiles);

    for (const path of japaneseFiles) {
        if (!englishSet.has(path)) errors.push(`${label}: 英語版に ${path} がありません`);
    }
    for (const path of englishFiles) {
        if (!japaneseSet.has(path)) errors.push(`${label}: 日本語版に ${path} がありません`);
    }
}

function resolveLink(sourceFile, rawTarget) {
    const target = decodeURIComponent(rawTarget.replace(/^<|>$/g, "").split(/[?#]/, 1)[0]);
    if (!target) return null;

    let path = target.startsWith("/")
        ? join(docsRoot, target.replace(/^\/+/, ""))
        : resolve(dirname(sourceFile), target);

    if (target.endsWith("/")) path = join(path, "index.md");
    if (extname(path) === ".html") path = path.slice(0, -5) + ".md";
    if (!extname(path)) {
        if (existsSync(`${path}.md`)) return `${path}.md`;
        path = join(path, "index.md");
    }

    return path;
}

const errors = [];
const japaneseManualFiles = listFiles(
    docsRoot,
    (path) =>
        extname(path) === ".md" &&
        !path.startsWith(`${englishRoot}${sep}`) &&
        !path.startsWith(`${vitePressRoot}${sep}`) &&
        !path.startsWith(`${japaneseReferenceRoot}${sep}`)
);
const englishManualFiles = listFiles(
    englishRoot,
    (path) => extname(path) === ".md" && !path.startsWith(`${englishReferenceRoot}${sep}`)
);

compareFileSets("手書きページ", japaneseManualFiles, englishManualFiles, errors);
compareFileSets(
    "生成リファレンス",
    listFiles(japaneseReferenceRoot),
    listFiles(englishReferenceRoot),
    errors
);

const markdownFiles = listFiles(
    docsRoot,
    (path) => extname(path) === ".md" && !path.startsWith(`${vitePressRoot}${sep}`)
).map((path) => join(docsRoot, path));
const linkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*)?\)/g;

for (const sourceFile of markdownFiles) {
    const source = readFileSync(sourceFile, "utf8");
    for (const match of source.matchAll(linkPattern)) {
        const target = match[1];
        if (/^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;

        const resolved = resolveLink(sourceFile, target);
        if (resolved && !existsSync(resolved)) {
            errors.push(
                `内部リンク: ${relative(repositoryRoot, sourceFile)} -> ${target} が見つかりません`
            );
        }
    }
}

if (errors.length > 0) {
    console.error("ドキュメントの日英対応チェックに失敗しました:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
} else {
    console.log(
        `ドキュメントの日英対応チェックに成功しました（手書き ${japaneseManualFiles.length} ページ、リファレンス ${listFiles(japaneseReferenceRoot).length} ファイル）。`
    );
}
