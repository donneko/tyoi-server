export function isLoopbackAddress(address: string | undefined): boolean {
    if (!address) return false;

    const normalized = address.toLowerCase().split("%")[0] ?? "";
    if (
        normalized === "::1" ||
        normalized === "0:0:0:0:0:0:0:1" ||
        normalized.startsWith("127.") ||
        normalized.startsWith("::ffff:127.")
    ) {
        return true;
    }

    const mappedHex = normalized.match(/(?:^|:)ffff:(?<network>[0-9a-f]{1,4}):[0-9a-f]{1,4}$/);
    if (!mappedHex?.groups?.network) return false;
    const network = Number.parseInt(mappedHex.groups.network, 16);
    return network >= 0x7f00 && network <= 0x7fff;
}

export function isGuiRequestAllowed(allowLan: boolean, address: string | undefined): boolean {
    return allowLan || isLoopbackAddress(address);
}
