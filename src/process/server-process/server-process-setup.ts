type ServerProcessSetupDependencies = {
    processOn: typeof process.on;
};

/**
 * 端末からのシグナルで子プロセスだけが先に終了することを防ぎます。
 * 停止処理は、同じシグナルを受けた親プロセスからの shutdown IPC に集約します。
 */
export function serverProcessSetup(
    dependencies: Partial<ServerProcessSetupDependencies> = {}
): void {
    const processOn = dependencies.processOn ?? process.on.bind(process);
    const ignoreTerminalSignal = () => undefined;

    processOn("SIGINT", ignoreTerminalSignal);
    processOn("SIGTERM", ignoreTerminalSignal);
}
