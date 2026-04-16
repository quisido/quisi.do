import type { ReactElement, ReactNode } from 'react';
import useFigure from '../core/use-figure.js';
import type { FigureProps } from '../core/figure-props.js';
import classes from './figure.module.scss';

interface FigureCaptionProps {
  readonly description?: ReactNode | undefined;
  readonly descriptionId: string;
  readonly name?: ReactNode | undefined;
  readonly nameId: string;
}

/**
 *   A `FigureCaption` component exposes the `caption` role as visible content
 * that names or describes its containing `Figure`. It can also serve as the
 * accessible name for the containing element when referenced.
 */
const FigureCaption = ({
  description,
  descriptionId,
  name,
  nameId,
}: FigureCaptionProps): ReactElement | null => {
  if (description === undefined && name === undefined) {
    return null;
  }

  return (
    <figcaption role="caption">
      {name !== undefined && <div id={nameId}>{name}</div>}
      {description !== undefined && <div id={descriptionId}>{description}</div>}
    </figcaption>
  );
};

/**
 *   A figure is a a perceivable section of content that typically contains a
 * graphical document, images, media player, code snippets, or example text. The
 * parts of a figure may be user-navigable.
 *   A figure should be referenced by the main text, but does not have to be
 * displayed at the same location.
 * @see {@link https://w3c.github.io/aria/#figure | WAI-ARIA `figure` role}
 */
export default function Figure({
  caption,
  captionPosition = 'start',
  children,
  description,
  id,
  label,
  labelledBy: labelledByProp,
}: FigureProps): ReactElement {
  const { describedBy, descriptionId, details, labelledBy, nameId } = useFigure(
    {
      description,
      label,
      labelledBy: labelledByProp,
    },
  );

  return (
    <figure
      className={classes['root']}
      aria-describedby={describedBy}
      aria-details={details}
      aria-label={label}
      aria-labelledby={labelledBy}
      id={id}
    >
      {captionPosition === 'start' && (
        <FigureCaption
          description={description}
          descriptionId={descriptionId}
          name={caption}
          nameId={nameId}
        />
      )}
      {children}
      {captionPosition === 'end' && (
        <FigureCaption
          description={description}
          descriptionId={descriptionId}
          name={caption}
          nameId={nameId}
        />
      )}
    </figure>
  );
}
