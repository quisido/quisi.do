import type { ReactElement } from 'react';
import type { ImageProps } from '../core/image-props.js';

/**
 *   Container for a collection of elements that form an image. An accessible
 * name is required.
 */
export default function Image({ name, src }: ImageProps): ReactElement {
  return <img alt={name} src={src} />;
}
