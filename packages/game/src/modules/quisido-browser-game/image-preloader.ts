import AsyncMap from './async-map.js';
import { EMPTY_OFFSCREEN_CANVAS } from './empty-offscreen-canvas.js';
import SyncMap from './sync-map.js';

const createHtmlImageElement = (src: string): HTMLImageElement => {
  const element: HTMLImageElement = new Image();
  element.setAttribute('src', src);
  return element;
};

const HtmlImageElements = new SyncMap(createHtmlImageElement);

const mapSrcToCanvasImageSource = (src: string): Promise<CanvasImageSource> => {
  const element: HTMLImageElement = HtmlImageElements.get(src);
  return window
    .createImageBitmap(element)
    .catch((): CanvasImageSource => EMPTY_OFFSCREEN_CANVAS);
};

const IMAGE_PRELOADER = new AsyncMap(mapSrcToCanvasImageSource);

export const getImage = (
  src: string,
): CanvasImageSource | Promise<CanvasImageSource> => {
  return IMAGE_PRELOADER.get(src);
};

export const preloadImage = (src: string): void => {
  void IMAGE_PRELOADER.get(src);
};

export const preloadImages = (...srcs: readonly string[]): void => {
  srcs.forEach(preloadImage);
};
