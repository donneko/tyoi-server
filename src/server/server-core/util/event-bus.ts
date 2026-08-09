/** イベントバスへ登録するハンドラです。 / Handler registered with an event bus. */
export type EventBusHandler<Type, Result = unknown> = (arg: Type) => Result | Promise<Result>;
export class EventBus<EventBusMap extends Record<string, unknown>> {
    #EVENT_DATA_STORE = new Map<keyof EventBusMap, unknown[]>();

    /**
     * ハンドラを登録します。 / Registers a handler.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @returns ハンドラを解除するための関数。 / A function that unregisters the handler.
     * @example
     * const unsubscribe = eventBus.on("foo", handler);
     * unsubscribe(); // ハンドラを解除 / Unregister the handler
     */
    on<Key extends keyof EventBusMap>(type: Key, fn: EventBusHandler<EventBusMap[Key]>) {
        if (!this.#EVENT_DATA_STORE.has(type)) {
            this.#EVENT_DATA_STORE.set(type, []);
        }
        const list = this.#EVENT_DATA_STORE.get(type)!;

        list.push(fn as unknown);

        return () => this.off(type, fn);
    }

    /**
     * 一度だけ実行するハンドラを登録します。 / Registers a handler that runs once.
     * @param type 登録するキー名。 / Key to register.
     * @param fn 実行するハンドラ。 / Handler to invoke.
     * @example
     * eventBus.once("foo", handler);
     */
    once<Key extends keyof EventBusMap>(type: Key, fn: EventBusHandler<EventBusMap[Key]>) {
        const func: EventBusHandler<EventBusMap[Key]> = (arg) => {
            this.off(type, func);
            return fn(arg);
        };
        return this.on(type, func);
    }

    /**
     * ハンドラが登録されているかを確認します。 / Checks whether a handler is registered.
     * @param type 調べるキー名。 / Key to check.
     * @returns 存在する場合は `true`。 / `true` when a handler exists.
     * @example
     * console.log(eventBus.has("foo"));
     */
    has(type: string): type is Extract<keyof EventBusMap, string> {
        return this.#EVENT_DATA_STORE.has(type as Extract<keyof EventBusMap, string>);
    }

    /**
     * ハンドラの登録を解除します。 / Unregisters a handler.
     * @param type 解除するキー名。 / Key to unregister.
     * @example
     * eventBus.off("foo",handler);
     */
    off<Key extends keyof EventBusMap>(type: Key, fn: EventBusHandler<EventBusMap[Key]>) {
        const list = this.#EVENT_DATA_STORE.get(type);
        if (!list) return;

        const index = list.indexOf(fn);
        if (index === -1) return;

        list.splice(index, 1);

        if (list.length === 0) {
            this.#EVENT_DATA_STORE.delete(type);
        }
    }

    /**
     * キー名で登録されたハンドラを実行します。 / Invokes handlers registered for a key.
     * @param type 実行するキー名。 / Key to invoke.
     * @param arg ハンドラに渡す引数。 / Argument passed to the handlers.
     * @example
     * eventBus.emit("foo",arg);
     */
    async emit<Key extends keyof EventBusMap>(type: Key, arg: EventBusMap[Key]): Promise<unknown> {
        const list = this.#EVENT_DATA_STORE.get(type);
        const task = [];

        if (!list) return;
        try {
            for (const fn of [...list]) {
                try {
                    task.push(Promise.resolve((fn as EventBusHandler<EventBusMap[Key]>)(arg)));
                } catch (error) {
                    task.push(Promise.reject(error));
                }
            }
            await Promise.all(task);
        } catch (error) {
            console.error(`[EventBus emit error] ${String(type)}`, error);
            throw error;
        }
    }
}
