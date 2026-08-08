/** APIレジストリーへ登録するハンドラです。 / Handler registered with an API registry. */
export type Handler<Type, Result = unknown> = (arg: Type) => Result | Promise<Result>;

export class HandlerRegistry<HandlerRegistryMap extends Record<string, unknown>> {
    #EVENT_DATA_STORE = new Map<keyof HandlerRegistryMap, unknown>();

    /**
     * ハンドラを登録します。 / Registers a handler.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @returns ハンドラを解除するための関数。 / A function that unregisters the handler.
     * @example
     * const unsubscribe = registry.on("foo", handler);
     * unsubscribe(); // ハンドラを解除 / Unregister the handler
     */
    on<KEY extends keyof HandlerRegistryMap>(type: KEY, fn: Handler<HandlerRegistryMap[KEY]>) {
        if (this.#EVENT_DATA_STORE.has(type)) {
            console.warn(`[HandlerRegistry on warn] すでに登録された関数が上書きされました。`);
        }

        this.#EVENT_DATA_STORE.set(type, fn as unknown);

        return () => {
            if (this.#EVENT_DATA_STORE.get(type) === fn) {
                this.off(type);
            }
        };
    }

    /**
     * 一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @example
     * registry.once("foo", handler);
     */
    once<Key extends keyof HandlerRegistryMap>(type: Key, fn: Handler<HandlerRegistryMap[Key]>) {
        const func: Handler<HandlerRegistryMap[Key]> = (arg) => {
            this.off(type);
            return fn(arg);
        };
        return this.on(type, func);
    }

    /**
     * ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.
     * @param type 調べるキー名。 / Key to check.
     * @returns 存在する場合は `true`。 / `true` when a handler exists.
     * @example
     * console.log(registry.has("foo"));
     */
    has(type: string): type is Extract<keyof HandlerRegistryMap, string> {
        return this.#EVENT_DATA_STORE.has(type as Extract<keyof HandlerRegistryMap, string>);
    }

    /**
     * ハンドラの登録を解除します。 / Unregisters a handler.
     * @param type 解除するキー名。 / Key to unregister.
     * @example
     * registry.off("foo");
     */
    off<Key extends keyof HandlerRegistryMap>(type: Key) {
        this.#EVENT_DATA_STORE.delete(type);
    }

    /**
     * キー名で登録されたハンドラを実行します。 / Invokes the handler registered for a key.
     * @param type 実行するキー名。 / Key to invoke.
     * @param arg ハンドラに渡す引数。 / Argument passed to the handler.
     * @example
     * registry.emit("foo",arg);
     */
    async emit<Key extends keyof HandlerRegistryMap>(
        type: Key,
        arg: HandlerRegistryMap[Key]
    ): Promise<unknown> {
        const fn = this.#EVENT_DATA_STORE.get(type);

        if (!fn) return;

        try {
            return await (fn as Handler<HandlerRegistryMap[Key]>)(arg);
        } catch (error) {
            console.error(`[HandlerRegistry emit error] ${String(type)}`, error);
            throw error;
        }
    }
}
