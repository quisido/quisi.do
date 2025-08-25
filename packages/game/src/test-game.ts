import world from './components/world.js';
import QuisidoGame from './modules/quisido-game/index.js';

interface TestGameOptions {
  readonly cancelTimeout: (id: number) => void;
  readonly scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
}

export default class TestGame extends QuisidoGame<unknown, unknown> {
  public constructor({ cancelTimeout, scheduleTimeout }: TestGameOptions) {
    super({
      cancelTimeout,
      Game: world,
      scheduleTimeout,
      seed: 1,
      timestamp: Date.now(),
    });
  }
}
