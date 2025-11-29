import { CANVAS } from './constants/canvas.js';
import PikachusBeach from './pikachus-beach/index.js';

const game = new PikachusBeach({
  canvas: CANVAS,
  initialState: {
    screen: 'start',
  },
});

window.console.log(game.toJSON());
