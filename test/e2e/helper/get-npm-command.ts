export function getNpmCommand() {
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    return npmCommand;
}
