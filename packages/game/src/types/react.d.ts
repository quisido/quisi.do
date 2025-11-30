import 'react';
import type {
  AudioProps,
  DrawImageProps,
  LayerProps,
} from '../modules/quisido-browser-game/index.js';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // @ts-expect-error This clashes with the HTML <audio> element.
      readonly audio: AudioProps;
      readonly 'draw-image': DrawImageProps;
      readonly layer: LayerProps;
    }
  }
}
