import type { SetupStaticFileContext } from "../../../types/context/setup-express/stop-express.type.js";
import express from "express";

export function setupStaticFile(publicDirectoryPath: string, context: SetupStaticFileContext) {
    context.expressServer.use(express.static(publicDirectoryPath));

    context.expressServer.use((req, res) => {
        const sendData = context.httpMetaManager.getMeta(404);
        res.status(sendData.code).send(
            `<h1>${sendData.message}</h1><br><p>${sendData.description}</p>`
        );
    });
}
