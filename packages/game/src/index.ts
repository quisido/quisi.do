import PikachusBeach from './pikachus-beach/index.js';

const FIRST = 0;

const CANVAS: HTMLCanvasElement | null = window.document
  .getElementsByTagName('canvas')
  .item(FIRST);

if (CANVAS === null) {
  throw new Error('Failed to find canvas.');
}

const game = new PikachusBeach({
  canvas: CANVAS,
  initialState: {
    screen: 'start',
  },
});
