import { Game, type GameOptions } from '../../game/src/index.js';
import type { BrowserGameAction } from './types/browser-game-action.js';

export interface BrowserGameOptions<State> extends GameOptions<State, BrowserGameAction> {
  readonly canvas: HTMLCanvasElement;
}

export default class BrowserGame<State> extends Game<State, BrowserGameAction> {
  #canvasRenderingContext2D: CanvasRenderingContext2D;

  public constructor({ canvas, ...options }: BrowserGameOptions<State>) {
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context === null) {
      throw new Error('Expected a canvas context.');
    }

    super(options);
    this.#canvasRenderingContext2D = context;
    this.#draw();
  }


  #draw(): void {
    window.requestAnimationFrame((): void => {
      this.#draw();
    });

    // const drawable = this.getEntities(isDrawable);
    // loop over each drawable entity
    // draw it if it has changed
  };
}
