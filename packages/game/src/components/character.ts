import type Actions from '../actions.js';
import type { GameObject } from '../modules/quisido-game/index.js';

interface Props {
  readonly name: string;
  readonly type: 'hero' | 'villain';
  readonly x: number;
  readonly y: number;
}

export default function character(
  this: GameObject<Actions>,
  { type, x, y }: Props,
): void {
  switch (type) {
    case 'hero':
      this.render({
        height: 64,
        image: 'hero.png',
        width: 48,
        x,
        y,
      });
      break;

    case 'villain':
      this.render({
        height: 64,
        image: 'villain.png',
        width: 48,
        x,
        y,
      });
  }
}
