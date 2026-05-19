const EMPTY = 0;
const EMPTY_SET: ReadonlySet<never> = new Set();

export default class SetMap<T> {
  readonly #map = new Map<string, ReadonlySet<T>>();

  public add(key: string, value: T): void {
    const values: ReadonlySet<T> | undefined = this.#map.get(key);
    if (typeof values === 'undefined') {
      this.#map.set(key, new Set([value]));
    } else {
      this.#map.set(key, new Set([...values, value]));
    }
  }

  public delete(key: string): boolean;
  public delete(key: string, value: T): boolean;
  public delete(key: string, value?: T): boolean {
    if (typeof value === 'undefined') {
      return this.#map.delete(key);
    }

    const values = new Set<T>(this.#map.get(key));
    values.delete(value);
    if (values.size === EMPTY) {
      return this.#map.delete(key);
    }

    this.#map.set(key, values);
    return true;
  }

  public get(key: string): ReadonlySet<T> {
    return this.#map.get(key) ?? EMPTY_SET;
  }
}
