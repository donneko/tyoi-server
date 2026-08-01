import type minimist from "minimist";
import type { CommandHandler } from "@donneko/tyoi-cli";
import type { MessageManager } from "../../messages/app/message-manager.js";

type Data<META> = {
    meta: META;
    args: string[];
    cmd: string[];
    input: string[];
};

export type MetaData = {
    pack: {
        version: string;
        name: string;
    };
    cli: {
        cwd: string;
        dirname: string;
    };
    config: {
        language: string;
    };
    option: minimist.ParsedArgs;
    context: {
        messageManager: MessageManager;
    };
};

export type CmdMetaData = Data<MetaData>;

export type CmdHandler = CommandHandler<MetaData>;
