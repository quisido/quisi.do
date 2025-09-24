import 'react';
import type {
  AudioProps,
  DrawImageProps,
  LayerProps,
} from '../modules/quisido-browser-game/index.js';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      readonly audio: AudioProps;
      readonly 'draw-image': DrawImageProps;
      readonly layer: LayerProps;
    }
  }
}
