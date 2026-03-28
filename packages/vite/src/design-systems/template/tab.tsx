import type { ReactElement, ReactNode } from 'react';

export interface TabProps {
  readonly children: ReactNode;
  readonly selected?: boolean | undefined;
}

/**
 *   A `Tab` component provides the label and selection mechanism for the tab
 * content that should be rendered to the user.
 */
export default function Tab({
  children,
  selected = false,
}: TabProps): ReactElement {
  return (
    <button aria-selected={selected} role="tab" type="button">
      {children}
    </button>
  );
}
