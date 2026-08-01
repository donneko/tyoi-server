import type { SetupStaticFileContext } from "../../../types/context/setup-express/stop-express.type.js";
import express from "express";

export function setupStaticFile(publicDirectoryPath: string, context: SetupStaticFileContext) {
    context.expressServer.use(express.static(publicDirectoryPath));

    context.expressServer.use((req, res) => {
        const message = context.messageManager.message("http.static.notFound.message");
        const description = context.messageManager.message("http.static.notFound.description");
        res.status(404).send(`<h1>${message}</h1><br><p>${description}</p>`);
    });
}
