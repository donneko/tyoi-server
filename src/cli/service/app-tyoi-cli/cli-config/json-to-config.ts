export function jsonToConfig(obj: Record<string, unknown>) {
    const config = {
        language: obj?.language ?? "ja-JP",
    };

    return config;
}
