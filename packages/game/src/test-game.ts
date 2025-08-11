import type Actions from './actions.js';
import character from './character.js';
import Game, {
  type GameObject,
  type RenderProps,
} from './modules/quisido-game/index.js';

interface Options {
  readonly onRender?: ((id: string, props: RenderProps) => void) | undefined;
}

export default class TestGame extends Game<Actions> {
  public constructor({ onRender }: Options) {
    super({
      objects: {},
      onRender,
      seed: 1,
      timestamp: Date.now(),

      game(this: GameObject<Actions>): void {
        this.addChild('main', character, { name: 'Ace', type: 'hero' });
      },
    });
  }
}
