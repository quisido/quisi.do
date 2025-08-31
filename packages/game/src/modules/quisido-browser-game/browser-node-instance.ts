export default class BrowserNodeInstance<T extends Node = Node> {
  readonly #node: T;

  public constructor(node: T) {
    this.#node = node;
  }

  public get node(): T {
    return this.#node;
  }
}
