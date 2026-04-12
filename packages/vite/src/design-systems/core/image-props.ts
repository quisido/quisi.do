import type { LabelProps } from './label-props.js';

interface Props {
  readonly alt: string;
  readonly src: string;
}

export type ImageProps = LabelProps & Props;
