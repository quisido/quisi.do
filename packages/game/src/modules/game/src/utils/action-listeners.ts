import type GameAction from "../types/game-action.js";

type ActionListenersRecord<Action extends GameAction> = {
  readonly [A in Action as A['type']]?: Set<(action: A) => void> | undefined;
};

const EMPTY_SET: ReadonlySet<never> = new Set();

export default class ActionListeners<Action extends GameAction> {
  readonly #record: ActionListenersRecord<Action> = {};

  public add<A extends Action>(type: A['type'], callback: (action: A) => void): void {
    // @ts-expect-error TypeScript seems wrong here.
    const callbacks: Set<(action: A) => void> | undefined = this.#record[type];
    if (callbacks === undefined) {
      // @ts-expect-error TypeScript seems wrong here.
      this.#record[type] = new Set([callback]);
    } else {
      callbacks.add(callback);
    }
  };

  public get<A extends Action>(type: A['type']): ReadonlySet<(action: A) => void> {
    // @ts-expect-error TypeScript seems wrong here.
    return this.#record[type] ?? EMPTY_SET;
  };

  public remove<A extends Action>(type: A['type'], callback: (action: A) => void): void {
    // @ts-expect-error TypeScript seems wrong here.
    this.#record[type]?.delete(callback);
  };
};
