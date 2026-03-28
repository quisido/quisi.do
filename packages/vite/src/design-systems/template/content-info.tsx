import type { ReactElement, ReactNode } from 'react';

export interface ContentInfoProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `ContentInfo` component is a landmark that contains information about
 * the parent document, such as copyright information or links to privacy
 * statements.
 */
export default function ContentInfo({
  children,
  label,
}: ContentInfoProps): ReactElement {
  return <footer aria-label={label}>{children}</footer>;
}
