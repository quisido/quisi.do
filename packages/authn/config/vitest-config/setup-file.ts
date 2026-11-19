const isFunction = (value: unknown): value is (...params: readonly unknown[]) => unknown => typeof value === "function";

for (const value of Object.values(globalThis)) {

  if (isFunction(value) && value.prototype !== undefined) {

    Object.freeze(value.prototype);

  }

}

export {};
