import { type GameObject } from '../../../game-engine/src/index.js';

export interface BrowserGameObject<T> extends GameObject<T> {
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
