import minimist from "minimist";

export function getOption(argv: string[]) {
    // コマンド解析
    const args = minimist(argv, {
        alias: {
            p: "port",
            o: "open",
            t: "template",
            v: "version",
            h: "help",
        },

        boolean: ["open", "version", "help"],

        string: ["template"],
    });

    const { open: browser, ...tmp } = args;
    const updateArgs = args.open ? { browser, ...tmp } : args;

    return updateArgs;
}
