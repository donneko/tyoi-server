import type { Logger } from "@donneko/tyoi-logger";

/** ロガーが生成するログ情報です。 / Log data created by the logger. */
export type LoggerCreateData = ReturnType<Logger["createInfo"]>;

/** 利用者が購読できるサーバーイベントです。 / Server events available to consumers. */
export type OutEventBusMap = {
    "server/log:*": LoggerCreateData | void;
};

/** 内部処理で使用するサーバーイベントです。 / Server events used internally. */
export type InnerEventBusMap = {
    "server/log:*": LoggerCreateData | void;
    "server/start:error": {
        error?: Error;
    };
    // "server/start:success":{
    // },
    // "server/start:process":{
    // },
    // "server/stop:error":{
    // },
    // "server/stop:timeout":{
    // },
    // "server/stop:success":{
    // },
    // "server/stop:process":{
    // }
};
