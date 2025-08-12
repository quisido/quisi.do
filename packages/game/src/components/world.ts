import { type default as Actions, type TapAction } from '../actions.js';
import { type GameObject } from '../modules/quisido-game/index.js';
import character from './character.js';

interface State {
  readonly destination: readonly [number, number];
}

export default function world(this: GameObject<Actions, State>): void {
  this.onAction('tap', ({ x, y }: TapAction): void => {
    this.setChild('shadow', character, {
      name: 'Shadow',
      type: 'villain',
      x,
      y,
    });
  });

  this.setChild('main', character, {
    name: 'Ace',
    type: 'hero',
    x: 0,
    y: 0,
  });
}
