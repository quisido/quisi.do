export default class SyncMap<K extends string, V> {
  readonly #getter: (key: K) => V;
  readonly #map = new Map<K, V>();

  public constructor(getter: (key: K) => V) {
    this.#getter = getter;
  }

  public get(key: K): V {
    const value: V | undefined = this.#map.get(key);
    if (value !== undefined) {
      return value;
    }

    const newValue: V = this.#getter(key);
    this.#map.set(key, newValue);
    return newValue;
  }
}
