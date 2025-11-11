import BrowserGame from './browser-game.js';
import type State from './state.js';

export interface Options {
  readonly canvas: HTMLCanvasElement;
  readonly initialState: State;
}

export default class PikachusBeach extends BrowserGame<State> {
  public constructor({ canvas, initialState }: Options) {
    super({ canvas, initialState });
  }
}
