import { serverConfigSchema, resolvedServerConfigSchema } from "../types/server-config.type.js";
import type { ResolvedServerConfig } from "../types/server-config.type.js";
import type { ServerConfig } from "../types/public/config.type.js";

type ExactServerConfig<Config extends ServerConfig> = Config &
    Record<Exclude<keyof Config, keyof ServerConfig>, never>;

/**
 * CLI で読み込むサーバー設定を検証して返します。
 *
 * `tyoi.config.js` の default export に指定します。
 * `root` は CLI 起動時に自動設定されるため、通常は指定不要です。
 *
 * @param config サーバー設定。未指定の項目には既定値が使われます。
 * @returns 検証済みのユーザー設定。
 * @throws {ZodError} 設定値が不正な場合。
 *
 * @example
 * ```ts
 * import { defineConfig } from "@donneko/tyoi-server";
 *
 * export default defineConfig({
 *   port: 3000,
 *   public: "../public/main",
 * });
 * ```
 */
export function defineConfig<const Config extends ServerConfig>(
    config: ExactServerConfig<Config>
): Config {
    serverConfigSchema.parse(config);
    return config;
}
export function defineDefaultConfig<const Config extends ResolvedServerConfig>(
    config: Config
): Config {
    resolvedServerConfigSchema.parse(config);
    return config;
}
