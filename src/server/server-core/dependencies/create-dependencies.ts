export function createDependencies<T>(
    defaultDependencies: () => T,
    dependencies: Partial<T> = {}
): T {
    return {
        ...defaultDependencies(),
        ...dependencies,
    };
}
