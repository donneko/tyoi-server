export function getServerPort(value: string | undefined): number {
    const port = Number(value ?? 3000);

    return Number.isInteger(port) && port >= 0 && port <= 65535 ? port : 3000;
}
