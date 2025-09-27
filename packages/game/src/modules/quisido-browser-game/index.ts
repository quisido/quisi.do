import type { ReactElement } from 'react';
import type { AudioProps, DrawImageProps, LayerProps } from './props.js';

export { default } from './browser-game.js';
export { preloadImage, preloadImages } from './image-preloader.js';
export {
  type AudioProps,
  type DrawImageProps,
  type LayerProps,
} from './props.js';

export type JSX =
  | ReactElement<AudioProps, 'audio'>
  | ReactElement<DrawImageProps, 'draw-image'>
  | ReactElement<LayerProps, 'layer'>;
