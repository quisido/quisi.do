import type { ReactElement, ReactNode } from 'react';

export interface TabPanelProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `TabPanel` component contains the resources associated with a `Tab` in a
 * `TabList`.
 */
export default function TabPanel({
  children,
  label,
}: TabPanelProps): ReactElement {
  return (
    <div aria-label={label} role="tabpanel">
      {children}
    </div>
  );
}
