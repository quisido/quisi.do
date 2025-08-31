export type Type = 'image' | 'music';

export interface Props {
  readonly image: ImageProps;
  readonly music: MusicProps;
}

export interface ImageProps {
  readonly height: number;
  readonly src: string;
  readonly width: number;
}

export interface MusicProps {
  readonly loop: boolean;
  readonly src: string;
  readonly volume: number;
}
