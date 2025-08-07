import type GameObject from './game-object.js';

interface Props {
  readonly name: string;
  readonly type: 'hero' | 'villain';
}

export default function character(
  this: GameObject,
  { name, type }: Props,
): void {
  switch (type) {
    case 'hero':
      this.render((): void => {
        window.console.log('Hero', name);
      });
      break;

    case 'villain':
      this.render((): void => {
        window.console.log('Villain:', name);
      });
  }
}
