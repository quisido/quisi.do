import type Actions from './actions.js';
import world from './components/world.js';
import Game, { type RenderProps } from './modules/quisido-game/index.js';

interface Options {
  readonly onRender?: ((id: string, props: RenderProps) => void) | undefined;
}

export default class TestGame extends Game<Actions> {
  public constructor({ onRender }: Options) {
    super({
      game: world,
      objects: {},
      onRender,
      seed: 1,
      timestamp: Date.now(),
    });
  }
}
