import { type GameComponent } from '../../../game/src/index.js';
import type { BrowserGameAction } from './browser-game-action.js';

export interface BrowserGameComponent<
  State,
  Action extends BrowserGameAction,
> extends GameComponent<State, Action> {
  readonly draw: (
    value: State,
  ) =>
    | HTMLCanvasElement
    | HTMLImageElement
    | HTMLVideoElement
    | ImageBitmap
    | OffscreenCanvas
    | SVGImageElement
    | VideoFrame;
}
