import type { Type } from './type.js';

export interface AudioProps {
  readonly loop: boolean;
  readonly src: string;
  readonly volume: number;
}

interface DrawImageSource {
  readonly height: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

/** Based on @type CanvasDrawImage['drawImage'] */
export interface DrawImageProps extends DrawImageSource {
  readonly quality?: ResizeQuality | undefined;
  readonly source?: DrawImageSource | undefined;
  readonly src: string;
}

export interface LayerProps {
  readonly height: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}

export interface Props {
  readonly [Type.Audio]: AudioProps;
  readonly [Type.DrawImage]: DrawImageProps;
  readonly [Type.Layer]: LayerProps;
  readonly [Type.Text]: TextProps;
}

export interface TextProps {
  readonly children: string;
}
