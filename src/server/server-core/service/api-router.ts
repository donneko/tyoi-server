import { match, parse, type MatchFunction, type ParamData, type Token } from "path-to-regexp";
import type { Handler } from "../util/api-registry.js";

type RouteEntry<Key extends string> = {
    key: Key;
    method: string;
    handler: Handler<unknown>;
    matcher: MatchFunction<ParamData>;
    order: number;
    staticRoute: boolean;
    literalCharacters: number;
    wildcards: number;
    optionalGroups: number;
};

export type ApiRouteMatch<Key extends string> = {
    key: Key;
    params: Readonly<Record<string, string | string[]>>;
};

function routeMetrics(tokens: Token[]) {
    let literalCharacters = 0;
    let wildcards = 0;
    let optionalGroups = 0;
    let dynamic = false;

    for (const token of tokens) {
        if (token.type === "text") literalCharacters += token.value.length;
        if (token.type === "param") dynamic = true;
        if (token.type === "wildcard") {
            dynamic = true;
            wildcards += 1;
        }
        if (token.type === "group") {
            dynamic = true;
            optionalGroups += 1;
            const nested = routeMetrics(token.tokens);
            literalCharacters += nested.literalCharacters;
            wildcards += nested.wildcards;
            optionalGroups += nested.optionalGroups;
        }
    }

    return { literalCharacters, wildcards, optionalGroups, staticRoute: !dynamic };
}

function splitKey(key: string) {
    const separator = key.indexOf(":");
    if (separator <= 0) throw new TypeError(`Invalid API route key: ${key}`);

    const path = key.slice(separator + 1);
    if (!path.startsWith("/")) throw new TypeError(`Invalid API route path: ${path}`);

    return {
        method: key.slice(0, separator).toUpperCase(),
        path,
    };
}

/** Stores API handlers and resolves HTTP requests against route patterns. */
export class ApiRouter<ApiMap extends Record<string, unknown>> {
    #routes = new Map<keyof ApiMap, RouteEntry<Extract<keyof ApiMap, string>>>();
    #nextOrder = 0;

    /**
     * ハンドラを登録します。 / Registers a handler.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @returns ハンドラを解除するための関数。 / A function that unregisters the handler.
     * @example
     * const unsubscribe = router.on("GET:/users/:id", handler);
     * unsubscribe();
     */
    on<KEY extends keyof ApiMap>(type: KEY, fn: Handler<ApiMap[KEY]>) {
        const key = String(type) as Extract<KEY, string>;
        const { method, path } = splitKey(key);
        const tokens = parse(path).tokens;
        const previous = this.#routes.get(type);

        if (previous) console.warn(`[ApiRouter on warn] すでに登録された関数が上書きされました。`);

        this.#routes.set(type, {
            key,
            method,
            handler: fn as Handler<unknown>,
            matcher: match(path),
            order: previous?.order ?? this.#nextOrder++,
            ...routeMetrics(tokens),
        });

        return () => {
            if (this.#routes.get(type)?.handler === fn) this.off(type);
        };
    }

    /**
     * 一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @example
     * router.once("GET:/users/:id", handler);
     */
    once<Key extends keyof ApiMap>(type: Key, fn: Handler<ApiMap[Key]>) {
        const wrapped: Handler<ApiMap[Key]> = (arg) => {
            this.off(type);
            return fn(arg);
        };
        return this.on(type, wrapped);
    }

    /**
     * ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.
     * @param type 調べるキー名。 / Key to check.
     * @returns 存在する場合は `true`。 / `true` when a handler exists.
     * @example
     * console.log(router.has("GET:/users/:id"));
     */
    has(type: string): type is Extract<keyof ApiMap, string> {
        return this.#routes.has(type as Extract<keyof ApiMap, string>);
    }

    /**
     * ハンドラの登録を解除します。 / Unregisters a handler.
     * @param type 解除するキー名。 / Key to unregister.
     * @example
     * router.off("GET:/users/:id");
     */
    off<Key extends keyof ApiMap>(type: Key) {
        this.#routes.delete(type);
    }

    /**
     * キー名で登録されたハンドラを実行します。 / Invokes the handler registered for a key.
     * @param type 実行するキー名。 / Key to invoke.
     * @param arg ハンドラに渡す引数。 / Argument passed to the handler.
     * @example
     * router.emit("GET:/users/:id", { params: { id: "1" } });
     */
    async emit<Key extends keyof ApiMap>(type: Key, arg: ApiMap[Key]): Promise<unknown> {
        const route = this.#routes.get(type);
        if (!route) return;

        try {
            return await route.handler(arg);
        } catch (error) {
            console.error(`[ApiRouter emit error] ${String(type)}`, error);
            throw error;
        }
    }

    find(method: string, path: string): ApiRouteMatch<Extract<keyof ApiMap, string>> | undefined {
        const candidates = [...this.#routes.values()]
            .filter((route) => route.method === method.toUpperCase())
            .sort((left, right) => {
                if (left.staticRoute !== right.staticRoute) return left.staticRoute ? -1 : 1;
                if (left.literalCharacters !== right.literalCharacters)
                    return right.literalCharacters - left.literalCharacters;
                if (left.wildcards !== right.wildcards) return left.wildcards - right.wildcards;
                if (left.optionalGroups !== right.optionalGroups)
                    return left.optionalGroups - right.optionalGroups;
                return left.order - right.order;
            });

        for (const route of candidates) {
            const result = route.matcher(path);
            if (result) {
                return {
                    key: route.key,
                    params: result.params as Readonly<Record<string, string | string[]>>,
                };
            }
        }
    }

    allowedMethods(path: string): string[] {
        const methods = new Set<string>();
        const routes = [...this.#routes.values()].sort((left, right) => left.order - right.order);
        for (const route of routes) {
            if (route.matcher(path)) methods.add(route.method);
        }
        return [...methods];
    }
}
