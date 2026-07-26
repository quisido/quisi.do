export default class AsyncMap<K, V> {
  readonly #getter: (key: K) => Promise<V> | V;
  readonly #map = new Map<K, Promise<V> | V>();

  public constructor(getter: (key: K) => Promise<V>) {
    this.#getter = getter;
  }

  public get(key: K): Promise<V> | V {
    const value: Promise<V> | V | undefined = this.#map.get(key);
    if (typeof value !== 'undefined') {
      return value;
    }

    const newValue: Promise<V> | V = this.#getter(key);
    this.#map.set(key, newValue);
    if (newValue instanceof Promise) {
      // Set the resolved value to make future calls synchronous.
      void newValue.then(this.#map.set.bind(this.#map, key));
    }

    return newValue;
  }
}
