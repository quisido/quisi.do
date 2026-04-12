import type { ReactElement } from 'react';
import type { ImageProps } from '../core/image-props.js';

/**
 *   An image is a container for a collection of elements that form an image.
 *   An image can contain captions and descriptive text, as well as multiple
 * image files that when viewed together give the impression of a single image.
 * An image represents a single graphic within a document, whether or not it is
 * formed by a collection of drawing objects.
 * @see {@link https://w3c.github.io/aria/#image | WAI-ARIA `image` role}
 */
export default function Image({
  alt,
  label,
  labelledBy,
  src,
}: ImageProps): ReactElement {
  return (
    <img
      alt={alt}
      aria-label={label}
      aria-labelledby={labelledBy}
      role="image"
      src={src}
    />
  );
}
