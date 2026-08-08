/** HTTP API ハンドラに渡されるリクエスト情報です。 / Request data passed to an HTTP API handler. */
export type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
};

/** HTTP API キーをリクエスト情報へ対応付けます。 / Maps HTTP API keys to request data. */
export type RequestEventMap<L extends string> = {
    [N in L]: RequestData;
};
