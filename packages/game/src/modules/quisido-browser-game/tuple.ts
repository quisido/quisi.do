export default class Tuple<T> {
  #elements: readonly [T, T];

  public constructor(first: T, second: T) {
    this.#elements = [first, second];
  }

  public get 0(): T {
    return this.#elements[0];
  }

  public get 1(): T {
    return this.#elements[0];
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.#elements[Symbol.iterator]();
  }

  public set(first: T, second: T): void {
    this.#elements = [first, second];
  }
}
