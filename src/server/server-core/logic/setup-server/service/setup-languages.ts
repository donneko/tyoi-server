import type { SetupLanguagesContext } from "../../../types/context/setup-server/setup-server.type.js";

export function setupLanguages(context: SetupLanguagesContext) {
    const language = context.serverConfig.getConfig("language");

    context.messageManager.setLanguage(language);
}
