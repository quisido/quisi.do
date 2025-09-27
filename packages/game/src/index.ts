import World from './components/world.js';
import BrowserGame from './modules/quisido-browser-game/index.js';
import reducer from './reducer.js';

const CANVAS: HTMLCanvasElement | null = window.document
  .getElementsByTagName('canvas')
  .item(0);

if (CANVAS === null) {
  throw new Error('Failed to find canvas.');
}

CANVAS.setAttribute('height', CANVAS.clientHeight.toString());
CANVAS.setAttribute('width', CANVAS.clientWidth.toString());

const game = new BrowserGame({
  canvas: CANVAS,
  Game: World,
  initialState: {
    acceleration: [0, 0],
    isAccelerating: [false, false, false, false],
    position: [0, 0],
    velocity: [0, 0],
  },
  reducer,
});

window.addEventListener('keydown', (event: KeyboardEvent): void => {
  game.dispatch({ payload: event, type: 'keydown' });
});

window.addEventListener('keypress', (event: KeyboardEvent): void => {
  game.dispatch({ payload: event, type: 'keypress' });
});

window.addEventListener('keyup', (event: KeyboardEvent): void => {
  game.dispatch({ payload: event, type: 'keyup' });
});
