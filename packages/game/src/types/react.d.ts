import 'react';

interface DrawImage {
  readonly height: number;
  readonly src: string;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

declare module 'react' {
  // import { type JSX } from 'react';
  namespace JSX {
    interface IntrinsicElements {
      readonly 'draw-image': DrawImage;
    }
  }
}
