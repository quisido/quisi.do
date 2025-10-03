import type { ReactElement } from 'react';
import type { AudioProps, DrawImageProps, LayerProps } from './props.js';

export type Jsx =
  | ReactElement<AudioProps, 'audio'>
  | ReactElement<DrawImageProps, 'draw-image'>
  | ReactElement<LayerProps, 'layer'>;
