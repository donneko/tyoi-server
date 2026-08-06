import express from "express";
import z from "zod";

const requestHandlerSchema = z.custom<express.RequestHandler>(
    (value) => typeof value === "function"
);

export const serverUserConfigSchema = z.object({
    baseDirname: z.string().optional(),
    publicDirname: z.string().optional(),
    apiPrefix: z.string().optional(),
    port: z.number().int().min(0).max(65535).optional(),
    middlewares: z.array(requestHandlerSchema).optional(),
    exposeLan: z.boolean().optional(),
    showQrCode: z.boolean().optional(),
    openBrowser: z.union([z.boolean(), z.enum(["local", "network"])]).optional(),
    autoPort: z.boolean().optional(),
    signalShutdownHandling: z.boolean().optional(),
    language: z.string().optional(),
});

export type ServerUserConfig = z.infer<typeof serverUserConfigSchema>;

export const serverDefaultConfigSchema = z.object({
    baseDirname: z.string().optional(),
    publicDirname: z.string(),
    apiPrefix: z.string(),
    port: z.number().int().min(0).max(65535),
    middlewares: z.array(requestHandlerSchema),
    exposeLan: z.boolean(),
    showQrCode: z.boolean(),
    openBrowser: z.union([z.boolean(), z.enum(["local", "network"])]),
    autoPort: z.boolean(),
    signalShutdownHandling: z.boolean(),
    language: z.string(),
});

export type ServerDefaultConfig = z.infer<typeof serverDefaultConfigSchema>;
