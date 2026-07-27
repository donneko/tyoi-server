import { describe, expect, it, vi } from "vitest";
import { apiProcess } from "./api-process.js";

function createResponse() {
    const response = {
        status: vi.fn(),
        json: vi.fn(),
    };
    response.status.mockReturnValue(response);
    response.json.mockReturnValue(response);
    return response;
}

describe("apiProcess", () => {
    it("登録済み API を実行して結果を返す", async () => {
        const request = {
            method: "POST",
            path: "/users",
            query: { page: "1" },
            body: { name: "Taro" },
            headers: { authorization: "token" },
        };
        const response = createResponse();
        const emit = vi.fn(async () => ({ id: 1 }));
        const serverAPIs = { has: vi.fn(() => true), emit };

        await apiProcess(request as never, response as never, { serverAPIs } as never);

        expect(serverAPIs.has).toHaveBeenCalledWith("POST:/users");
        expect(emit).toHaveBeenCalledWith("POST:/users", {
            query: request.query,
            body: request.body,
            headers: request.headers,
        });
        expect(response.json).toHaveBeenCalledWith({
            ok: true,
            data: { id: 1 },
        });
        expect(response.status).not.toHaveBeenCalled();
    });

    it("未登録 API には404エラーを返す", async () => {
        const response = createResponse();
        const serverAPIs = {
            has: vi.fn(() => false),
            emit: vi.fn(),
        };

        await apiProcess(
            {
                method: "GET",
                path: "/missing",
            } as never,
            response as never,
            { serverAPIs } as never
        );

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            ok: false,
            code: "API_NOT_FOUND",
            message: "API not found",
        });
        expect(serverAPIs.emit).not.toHaveBeenCalled();
    });

    it.each([
        [
            "has",
            {
                has: vi.fn(() => {
                    throw new Error("has failed");
                }),
                emit: vi.fn(),
            },
        ],
        [
            "emit",
            {
                has: vi.fn(() => true),
                emit: vi.fn(async () => {
                    throw new Error("emit failed");
                }),
            },
        ],
    ])("%s の例外には500エラーを返す", async (_operation, serverAPIs) => {
        const response = createResponse();

        await apiProcess(
            { method: "GET", path: "/users" } as never,
            response as never,
            { serverAPIs } as never
        );

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            ok: false,
            code: "API_INTERNAL_ERROR",
            message: "Internal server error",
        });
    });
});
