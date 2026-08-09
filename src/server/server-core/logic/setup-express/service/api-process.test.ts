import { describe, expect, it, vi } from "vitest";
import { apiResponse } from "../../../service/api-response.js";
import { apiProcess } from "./api-process.js";

function createResponse() {
    const response = {
        status: vi.fn(),
        set: vi.fn(),
        json: vi.fn(),
    };
    response.status.mockReturnValue(response);
    response.set.mockReturnValue(response);
    response.json.mockReturnValue(response);
    return response;
}

function createContext(apiRegistry: object) {
    return {
        apiRegistry,
        messageManager: {
            message: vi.fn((key: string) => {
                if (key === "http.api.notFound") return "API not found";
                if (key === "http.api.methodNotAllowed") return "Method not allowed";
                return "Internal server error";
            }),
        },
    };
}

function createRegistry(result: unknown = { id: 1 }) {
    return {
        find: vi.fn(() => ({ key: "POST:/users/:id", params: { id: "a b" } })),
        allowedMethods: vi.fn(() => []),
        emit: vi.fn(async () => result),
    };
}

describe("apiProcess", () => {
    it("passes matched route parameters to the registered handler", async () => {
        const request = {
            method: "POST",
            path: "/users/a%20b",
            query: { page: "1" },
            body: { name: "Taro" },
            headers: { authorization: "token" },
        };
        const response = createResponse();
        const apiRegistry = createRegistry();

        await apiProcess(request as never, response as never, createContext(apiRegistry) as never);

        expect(apiRegistry.find).toHaveBeenCalledWith("POST", "/users/a%20b");
        expect(apiRegistry.emit).toHaveBeenCalledWith("POST:/users/:id", {
            query: request.query,
            body: request.body,
            headers: request.headers,
            params: { id: "a b" },
        });
        expect(response.json).toHaveBeenCalledWith({ id: 1 });
        expect(response.status).not.toHaveBeenCalled();
    });

    it("returns the explicit status and body from apiResponse", async () => {
        const response = createResponse();
        const apiRegistry = createRegistry(apiResponse({ id: 1 }, { status: 201 }));

        await apiProcess(
            { method: "POST", path: "/users/1" } as never,
            response as never,
            createContext(apiRegistry) as never
        );

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("does not treat an ordinary status/body object as ApiResponse", async () => {
        const response = createResponse();
        const result = { status: 201, body: { id: 1 } };
        const apiRegistry = createRegistry(result);

        await apiProcess(
            { method: "POST", path: "/users/1" } as never,
            response as never,
            createContext(apiRegistry) as never
        );

        expect(response.status).not.toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith(result);
    });

    it("returns 405 and Allow when only another method matches", async () => {
        const response = createResponse();
        const apiRegistry = {
            find: vi.fn(() => undefined),
            allowedMethods: vi.fn(() => ["GET", "PUT"]),
            emit: vi.fn(),
        };

        await apiProcess(
            { method: "POST", path: "/users/1" } as never,
            response as never,
            createContext(apiRegistry) as never
        );

        expect(response.set).toHaveBeenCalledWith("Allow", "GET, PUT");
        expect(response.status).toHaveBeenCalledWith(405);
        expect(response.json).toHaveBeenCalledWith({
            code: "API_METHOD_NOT_ALLOWED",
            message: "Method not allowed",
        });
        expect(apiRegistry.emit).not.toHaveBeenCalled();
    });

    it("returns 404 when no route pattern matches", async () => {
        const response = createResponse();
        const apiRegistry = {
            find: vi.fn(() => undefined),
            allowedMethods: vi.fn(() => []),
            emit: vi.fn(),
        };

        await apiProcess(
            { method: "GET", path: "/missing" } as never,
            response as never,
            createContext(apiRegistry) as never
        );

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            code: "API_NOT_FOUND",
            message: "API not found",
        });
    });

    it("turns handler and invalid status errors into a 500 response", async () => {
        const response = createResponse();
        response.status.mockImplementation((status: number) => {
            if (status === 99) throw new RangeError("Invalid status code");
            return response;
        });
        const apiRegistry = createRegistry(apiResponse(null, { status: 99 }));

        await apiProcess(
            { method: "GET", path: "/users/1" } as never,
            response as never,
            createContext(apiRegistry) as never
        );

        expect(response.status).toHaveBeenLastCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            code: "API_INTERNAL_ERROR",
            message: "Internal server error",
        });
    });
});
