interface Options {
  readonly now?: (() => number) | undefined;
}

interface State<T> {
  readonly expiration: number;
  readonly value: T;
}

export default class TemporaryMap<T> {
  #map = new Map<string, State<T>>();

  public get(
    key: string,
    { now = Date.now.bind(Date) }: Options = {},
  ): T | undefined {
    const state: State<T> | undefined = this.#map.get(key);
    if (typeof state === 'undefined') {
      return;
    }

    // Clean up! The cache has expired. 🧼
    const { expiration, value } = state;
    if (expiration <= now()) {
      this.#map.delete(key);
      return;
    }

    return value;
  }

  public set(
    key: string,
    value: T,
    expiration: number,
    { now = Date.now.bind(Date) }: Options = {},
  ): void {
    this.#map.set(key, {
      expiration: now() + expiration,
      value,
    });
  }
}
