import readline from "node:readline/promises";

// TODO 後で、tyoi-logger に統合
export async function askPermission(message: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    try {
        let answerReturn: boolean | null = null;

        while (answerReturn === null) {
            const answer = await rl.question(`${message} (y/n): `);
            const answerUpper = answer.toUpperCase();

            if (answerUpper === "Y" || answerUpper === "YES") {
                answerReturn = true;
                break;
            }
            if (answerUpper === "N" || answerUpper === "NO") {
                answerReturn = false;
                break;
            }
        }

        return answerReturn;
    } finally {
        rl.close();
    }
}
