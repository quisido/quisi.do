import AsyncMap from './async-map.js';
import { EMPTY_OFFSCREEN_CANVAS } from './empty-offscreen-canvas.js';
import SyncMap from './sync-map.js';

const createHtmlImageElement = (src: string): HTMLImageElement => {
  const element: HTMLImageElement = window.document.createElement('img');
  element.setAttribute('src', src);
  return element;
};

const loadImage = (image: HTMLImageElement): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject): void => {
    image.addEventListener('load', (): void => {
      resolve(image);
    });
    image.addEventListener('error', (event: ErrorEvent): void => {
      reject(new Error(event.message));
    });
  });
};

const HtmlImageElements = new SyncMap(createHtmlImageElement);

const mapSrcToCanvasImageSource = async (
  src: string,
): Promise<CanvasImageSource> => {
  const element: HTMLImageElement = HtmlImageElements.get(src);
  await loadImage(element);
  return window
    .createImageBitmap(element)
    .catch((err: unknown): CanvasImageSource => {
      window.console.error('Failed to load image:', src, err);
      return EMPTY_OFFSCREEN_CANVAS;
    });
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
