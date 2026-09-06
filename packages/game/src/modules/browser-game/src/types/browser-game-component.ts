import { type GameComponent } from '../../../game-engine/src/index.js';
import type { BrowserGameAction } from './browser-game-action.js';

export interface BrowserGameComponent<
  T,
  A extends BrowserGameAction,
> extends GameComponent<T, A> {
  readonly draw: (
    value: T,
  ) =>
    | HTMLCanvasElement
    | HTMLImageElement
    | HTMLVideoElement
    | ImageBitmap
    | OffscreenCanvas
    | SVGImageElement
    | VideoFrame;
}
