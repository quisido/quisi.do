import AsyncMap from './async-map.js';

const createEmptyImageBitmap = (): ImageBitmap => new ImageBitmap();

const mapSrcToImageBitmap = (src: string): Promise<ImageBitmap> => {
  const image = new Image();
  image.setAttribute('src', src);
  return createImageBitmap(image).catch(createEmptyImageBitmap);
};

const IMAGE_PRELOADER = new AsyncMap(mapSrcToImageBitmap);

export const getImage = (src: string): ImageBitmap | Promise<ImageBitmap> => {
  return IMAGE_PRELOADER.get(src);
};

export const preloadImage = (src: string): void => {
  void IMAGE_PRELOADER.get(src);
};

export const preloadImages = (...srcs: readonly string[]): void => {
  srcs.forEach(preloadImage);
};
