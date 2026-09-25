/// <reference types="bun-types" />
import { describe, expect, it } from 'bun:test';
import { Game, type GameAction, type GameComponentProps } from './index.js';

type Action = GameAction<'increment', { value: number }> | GameAction<'multiply', { value: number }>;

const increment = (state: number, { payload: { value } }: GameAction<'increment', { value: number }>): number => state + value;

describe('Game', (): void => {
  it('should respond to actions', (): void => {
    const game = new Game({
      initialState: 1,
      world: ({ listen }: GameComponentProps<number, Action>): void => {
        listen('increment', increment);
      },
    });
    game.dispatch({ payload: { value: 1 }, timestamp: Date.now(), type: 'increment' }, );
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
    game.dispatch({ payload: { value: 3 }, timestamp: now + 3, type: 'increment' }, );
    game.dispatch({ payload: { value: 3 }, timestamp: now + 1, type: 'multiply' }, );

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
    game.dispatch({ payload: { value: 3 }, timestamp: now, type: 'increment' }, );
    game.dispatch({ payload: { value: 3 }, timestamp: now - 600_000, type: 'multiply' }, );

    // If this value is 6 (1*3=3, 3+3=6), then actions with distant timestamps
    // are being processed.
    expect(game.state).toBe(4);
  });

  it('should return action history of other players', (): void => {
    const game = new Game({
      initialState: 1,
      world: ({ listen }: GameComponentProps<number, Action>): void => {
        listen('increment', increment);
      },
    });

    const now: number = Date.now();
    game.dispatch({ payload: { value: 1 }, player: 1, timestamp: now, type: 'increment' },  );
    game.dispatch({ payload: { value: 1 }, player: 2, timestamp: now + 1, type: 'increment' },  );
    game.dispatch({ payload: { value: 1 }, player: 3, timestamp: now + 2, type: 'increment' },  );
    const othersActions = game.dispatch({ payload: { value: 1 }, player: 1, timestamp: now + 3, type: 'increment' });
    expect(othersActions).toStrictEqual([
      { payload: { value: 1 }, player: 2, timestamp: now + 1, type: 'increment' },
      { payload: { value: 1 }, player: 3, timestamp: now + 2, type: 'increment' },
    ]);

    // If this value is 6 (1*3=3, 3+3=6), then actions with distant timestamps
    // are being processed.
    expect(game.state).toBe(4);
  });
});
