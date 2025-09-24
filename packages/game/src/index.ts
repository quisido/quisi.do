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
    acceleration: 0,
    facing: 0,
    velocity: 0,
    x: 0,
    y: 0,
  },
  reducer,
});

setInterval((): void => {
  window.console.log(game.toJSON());
}, 10_000);
