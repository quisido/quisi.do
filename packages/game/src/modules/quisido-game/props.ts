import type { Type } from './type.js';

export interface AudioProps {
  readonly loop: boolean;
  readonly src: string;
  readonly volume: number;
}

export interface DrawImageProps {
  readonly height: number;
  readonly src: string;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export interface Props {
  readonly [Type.Audio]: AudioProps;
  readonly [Type.DrawImage]: DrawImageProps;
  readonly [Type.Text]: TextProps;
}

export interface TextProps {
  readonly children: string;
}
