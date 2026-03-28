import type { ReactElement, ReactNode } from 'react';

export interface DirectoryProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Directory` component represents a list of references to members of a
 * group, such as a static table of contents. This role is deprecated in
 * WAI-ARIA 1.2 and later.
 */
export default function Directory({
  children,
  label,
}: DirectoryProps): ReactElement {
  return (
    <ul aria-label={label} role="directory">
      {children}
    </ul>
  );
}
