import type { ReactElement, ReactNode } from 'react';

export interface GroupProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Group` component collects related interface objects and information that
 * are not intended to appear in a page summary or table of contents. It is
 * commonly used to form logical collections inside composite widgets.
 */
export default function Group({ children, label }: GroupProps): ReactElement {
  return (
    <div aria-label={label} role="group">
      {children}
    </div>
  );
}
