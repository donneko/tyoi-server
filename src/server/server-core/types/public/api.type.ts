export type RequestData = {
    query: unknown;
    body: unknown;
    headers: unknown;
};

export type RequestEventMap<L extends string> = {
    [N in L]: RequestData;
};
