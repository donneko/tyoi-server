export function isValidationConfig(obj: Record<string, unknown>): obj is { language: string } {
    return typeof obj?.language === "string" && Object.keys(obj).every((key) => key === "language");
}
