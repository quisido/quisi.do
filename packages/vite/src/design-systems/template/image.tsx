import type { ReactElement } from 'react';

export interface ImageProps {
  readonly name: string;
  readonly src: string;
}

/**
 *   Container for a collection of elements that form an image. An accessible
 * name is required.
 */
export default function Image({ name, src }: ImageProps): ReactElement {
  return <img alt={name} src={src} />;
}
