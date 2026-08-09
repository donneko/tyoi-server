const API_RESPONSE = Symbol("ApiResponse");

/** APIハンドラーが返すHTTP statusとbodyです。 / HTTP status and body returned by an API handler. */
export type ApiResponse<T> = {
    readonly body: T;
    readonly status: number;
    readonly [API_RESPONSE]: true;
};

/** 指定したHTTP statusのAPIレスポンスを作成します。 / Creates an API response with an explicit HTTP status. */
export function apiResponse<T>(body: T, options: { status: number }): ApiResponse<T> {
    return {
        body,
        status: options.status,
        [API_RESPONSE]: true,
    };
}

export function isApiResponse(value: unknown): value is ApiResponse<unknown> {
    return typeof value === "object" && value !== null && API_RESPONSE in value;
}
