import type { ReactElement, ReactNode } from 'react';

interface FigureCaptionProps {
  readonly description?: ReactNode | undefined;
  readonly descriptionId: string;
  readonly name?: ReactNode | undefined;
  readonly nameId: string;
}

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
