import { type GameEntity } from '../../game/src/index.js';
import type { BrowserGameComponent } from './types/browser-game-entity.js';
import type { BrowserGameAction } from './types/browser-game-action.js';

const World = (): void => {
  // Do nothing.
};

const game = new GameEngine({
  initialState: {},
  world: World,
});

const canvas: HTMLCanvasElement | undefined =
  window.document.getElementsByTagName('canvas')[0];
if (canvas === undefined) {
  throw new Error('Expected a canvas.');
}

const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (context === null) {
  throw new Error('Expected a canvas context.');
}

const isDrawable = (
  entity: GameEntity<unknown, BrowserGameAction>,
): entity is GameEntity<unknown, BrowserGameAction> &
  Record<'component', BrowserGameComponent<unknown, BrowserGameAction>> => {
  return 'draw' in entity.component;
};

const draw = (): void => {
  window.requestAnimationFrame(draw);
  const drawable = game.getEntities(isDrawable);
  // loop over each drawable entity
  // draw it if it has changed
};

draw();
