import type { Type } from './type.js';

export interface AudioProps {
  readonly loop: boolean;
  readonly src: string;
  readonly volume: number;
}

export interface ImageProps {
  readonly height: number;
  readonly src: string;
  readonly width: number;
}

export interface Props {
  readonly [Type.Audio]: AudioProps;
  readonly [Type.Image]: ImageProps;
  readonly [Type.Text]: TextProps;
}

export interface TextProps {
  readonly children: string;
}
