import type { ReactElement, ReactNode } from 'react';

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
export default function FigureCaption({
  description,
  descriptionId,
  name,
  nameId,
}: FigureCaptionProps): ReactElement | null {
  if (description === undefined && name === undefined) {
    return null;
  }

  return (
    <figcaption role="caption">
      {name !== undefined && <div id={nameId}>{name}</div>}
      {description !== undefined && <div id={descriptionId}>{description}</div>}
    </figcaption>
  );
}
