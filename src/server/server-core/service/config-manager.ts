import { ConfigController } from "../util/config-controller.js";
import z from "zod";
import { resolvedServerConfigSchema } from "../types/server-config.type.js";
import TYOI_DEFAULT_CONFIG from "../config/tyoi.default.config.js";

type RuntimeServerConfig = z.infer<typeof resolvedServerConfigSchema>;
type ConfigControllerType = ConfigController<RuntimeServerConfig>;
export class ConfigManager {
    private configController = new ConfigController<RuntimeServerConfig>(
        TYOI_DEFAULT_CONFIG,
        resolvedServerConfigSchema
    );

    updateConfig(
        ...config: Parameters<ConfigControllerType["updateConfig"]>
    ): ReturnType<ConfigControllerType["updateConfig"]> {
        return this.configController.updateConfig(...config);
    }
    getConfig<K extends keyof RuntimeServerConfig>(key: K): RuntimeServerConfig[K] {
        return this.configController.getConfig(key);
    }
}
