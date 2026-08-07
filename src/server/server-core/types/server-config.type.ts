import express from "express";
import z from "zod";

export const serverConfigSchema = z.object({
    root: z.string().optional(),
    public: z.string().optional(),
    api: z.string().optional(),
    port: z.number().optional(),
    middlewares: z.array(z.custom<express.RequestHandler>()).optional(),
    lan: z.boolean().optional(),
    qr: z.boolean().optional(),
    browser: z.union([z.boolean(), z.enum(["local", "lan"])]).optional(),
    autoPort: z.boolean().optional(),
    signalClose: z.boolean().optional(),
    language: z.string().optional(),
});

export const resolvedServerConfigSchema = z.object({
    root: z.string().optional(),
    public: z.string(),
    api: z.string(),
    port: z.number(),
    middlewares: z.array(z.custom<express.RequestHandler>()),
    lan: z.boolean(),
    qr: z.boolean(),
    browser: z.union([z.boolean(), z.enum(["local", "lan"])]),
    autoPort: z.boolean(),
    signalClose: z.boolean(),
    language: z.string(),
});
