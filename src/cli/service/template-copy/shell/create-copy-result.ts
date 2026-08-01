import { Logger } from "@donneko/tyoi-logger";
import { messageManager } from "../../../../messages/default-message-manager.js";

export function createCopyResult({
    error,
    ok,
}: {
    error: string[];
    ok: string[];
}): [string, ReturnType<Logger["createError"]>[]] {
    const logger = new Logger();

    return [
        messageManager.message("cli.copy.result"),
        [...error.map((m) => logger.createError(m)), ...ok.map((m) => logger.createSuccess(m))],
    ];
}
