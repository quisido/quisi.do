import type { ReactElement } from 'react';
import useFigure from '../shared/use-figure.js';
import type { FigureProps } from '../shared/figure-props.js';
import FigureCaption from './figure-caption.jsx';

/**
 *   A `Figure` component is a a perceivable section of content that typically
 * contains a graphical document, images, media player, code snippets, or
 * example text. The parts of a figure may be user-navigable.
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
