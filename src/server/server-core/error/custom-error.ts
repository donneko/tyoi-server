export type CustomErrorOptions = {
    cause?: unknown;
    errorName?: string;
};

export type CustomErrorObjectReturn = {
    name: string;
    errorName: string | undefined;
    message: string;
    stack: string | undefined;
    cause: unknown;
};

export class CustomError extends Error {
    errorName;
    constructor(message: string, option: CustomErrorOptions = {}) {
        super(message, { cause: option.cause });
        this.name = this.constructor.name;
        this.errorName = option.errorName;
    }

    toObject(): CustomErrorObjectReturn {
        return {
            name: this.name,
            errorName: this.errorName,
            message: this.message,
            stack: this.stack,
            cause: this.cause,
        };
    }
}
