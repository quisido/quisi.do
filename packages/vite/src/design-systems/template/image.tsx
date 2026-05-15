import type { ReactElement } from 'react';
import type { ImageProps } from '../core/image-props.js';
import classes from './image.module.scss';

/**
 * An image is a container for a collection of elements that form an image.
 * An image can contain captions and descriptive text, as well as multiple
 * image files that when viewed together give the impression of a single image.
 * An image represents a single graphic within a document, whether or not it is
 * formed by a collection of drawing objects.
 * @see {@link https://w3c.github.io/aria/#image | WAI-ARIA `image` role}
 */
export default function Image({
  alt,
  labelledBy,
  src,
}: ImageProps): ReactElement {
  return (
    <img
      alt={alt}
      aria-labelledby={labelledBy}
      className={classes['image']}
      role="image"
      src={src}
    />
  );
}
