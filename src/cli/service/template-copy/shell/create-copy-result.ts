import { Logger } from "@donneko/tyoi-logger";
import type { MessageManager } from "../../../../messages/index.js";

export function createCopyResult(
    {
        error,
        ok,
    }: {
        error: string[];
        ok: string[];
    },
    messageManager: MessageManager
): [string, ReturnType<Logger["createError"]>[]] {
    const logger = new Logger();

    return [
        messageManager.message("cli.copy.result"),
        [...error.map((m) => logger.createError(m)), ...ok.map((m) => logger.createSuccess(m))],
    ];
}
