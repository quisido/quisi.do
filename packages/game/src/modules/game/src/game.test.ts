/// <reference types="bun-types" />
import { describe, expect, it } from 'bun:test';
import { Game, type GameComponentProps } from './index.js';

type Action = IncrementAction | MultiplyAction;

interface IncrementAction {
  readonly type: 'increment';
  readonly value: number;
}

interface MultiplyAction {
  readonly type: 'multiply';
  readonly value: number;
}

const increment = (state: number, { value }: IncrementAction): number => state + value;

describe('Game', (): void => {
  it('should respond to actions', (): void => {
    const game = new Game({
      initialState: 1,
      world: ({ listen }: GameComponentProps<number, Action>): void => {
        listen('increment', increment);
      },
    });
    game.dispatch({ type: 'increment', value: 1 }, Date.now());
    expect(game.state).toBe(2);
  });

  it('should respect proximate actions', (): void => {
    const game = new Game({
      initialState: 1,
      world: ({ listen }: GameComponentProps<number, Action>): void => {
        listen('increment', increment);
      },
    });

    const now: number = Date.now();
    game.dispatch({ type: 'increment', value: 3 }, now + 3);
    game.dispatch({ type: 'multiply', value: 3 }, now + 1);

    // If this value is 12 (1+3=4; 4*3=12), then the actions are not being
    // processed in timestamp order.
    expect(game.state).toBe(6);
  });

  it('should ignore distant actions', (): void => {
    const game = new Game({
      initialState: 1,
      world: ({ listen }: GameComponentProps<number, Action>): void => {
        listen('increment', increment);
      },
    });

    const now: number = Date.now();
    game.dispatch({ type: 'increment', value: 3 }, now);
    game.dispatch({ type: 'multiply', value: 3 }, now - 600_000);

    // If this value is 6 (1*3=3, 3+3=6), then actions with distant timestamps
    // are being processed.
    expect(game.state).toBe(4);
  });
});
