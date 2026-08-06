export function getNodeCommand() {
    const nodeCommand = process.platform === "win32" ? "node.cmd" : "node";
    return nodeCommand;
}
