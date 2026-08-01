export function isValidationConfig(obj: Record<string, unknown>): obj is { language: string } {
    return typeof obj?.language === "string" && Object.keys(obj).some((key) => key !== "language");
}
