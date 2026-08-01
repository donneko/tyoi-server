import type { SetupLanguagesContext } from "../../../types/context/setup-server/setup-server.type.js";

export function setupLanguages(context: SetupLanguagesContext) {
    const languages = context.serverConfig.getConfig("languages");

    context.messageManager.setLanguage(languages);
}
