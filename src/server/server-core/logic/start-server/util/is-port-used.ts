import type { IsPortUsedDependencies } from "../../../types/dependencies/start-server/create-server-config.type.js";
import { defaultIsPortUsedDependencies } from "../dependencies/create-server-config.js";
import { createDependencies } from "../../../dependencies/create-dependencies.js";

export async function isPortUsed(
    port: number,
    host: string,
    dependencies: Partial<IsPortUsedDependencies> = {}
): Promise<boolean> {
    const deps = createDependencies<IsPortUsedDependencies>(
        defaultIsPortUsedDependencies,
        dependencies
    );

    return new Promise((resolve) => {
        const server = deps.createServer();

        server.once("error", (err: NodeJS.ErrnoException) => {
            if (err.code === "EADDRINUSE") {
                resolve(true);
            } else {
                resolve(false);
            }
        });

        server.once("listening", () => {
            server.close((error) => {
                if (error) {
                    resolve(false);
                    return;
                }

                resolve(false);
            });
        });

        server.listen(port, host);
    });
}
