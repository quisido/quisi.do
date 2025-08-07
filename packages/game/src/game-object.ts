import type Game from './game.js';

export interface GameObjectOptions {
  readonly game: Game;
  readonly id: string;
}

export default class GameObject {
  readonly #game: Game;
  readonly #id: string;

  public constructor({ game, id }: GameObjectOptions) {
    this.#game = game;
    this.#id = id;
  }

  public addChild<P>(
    key: string,
    objectFunction: (this: GameObject, props: P) => void,
    props: P,
  ): void {
    this.#game.addChild(this.#id, key, objectFunction, props);
  }

  public render(callback: () => void): void {
    this.#game.setRender(this.#id, callback);
  }
}
