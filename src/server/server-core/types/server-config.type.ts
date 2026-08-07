import express from "express";
import z from "zod";

const requestHandlerSchema = z.custom<express.RequestHandler>(
    (value) => typeof value === "function"
);

export const serverConfigSchema = z
    .object({
        root: z.string().optional(),
        public: z.string().optional(),
        api: z.string().optional(),
        lan: z.boolean().optional(),
        qr: z.boolean().optional(),
        browser: z.union([z.boolean(), z.enum(["local", "lan"])]).optional(),
        port: z.number().int().min(0).max(65535).optional(),
        middlewares: z.array(requestHandlerSchema).optional(),
        autoPort: z.boolean().optional(),
        signalClose: z.boolean().optional(),
        language: z.string().optional(),
    })
    .strict();

export const resolvedServerConfigSchema = z.object({
    root: z.string().optional(),
    public: z.string(),
    api: z.string(),
    port: z.number().int().min(0).max(65535),
    middlewares: z.array(requestHandlerSchema),
    lan: z.boolean(),
    qr: z.boolean(),
    browser: z.union([z.boolean(), z.enum(["local", "lan"])]),
    autoPort: z.boolean(),
    signalClose: z.boolean(),
    language: z.string(),
});
